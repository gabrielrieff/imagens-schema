"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "~/firebase/firebaseConnec";

import { usePathname, useRouter } from "next/navigation";

import { ReactNode, createContext, useEffect, useState } from "react";
import { authUserModelProps, createUserModelProps } from "~/model/userModel";

type AuthContextData = {
  userAuth?: authUserModelProps;
  signIn: (email: string, password: string) => void;
  signOutUser: () => void;
  createUser: ({ email, name, password, user }: createUserModelProps) => void;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();
  const pathname = usePathname();

  const [userAuth, setUserAuth] = useState<authUserModelProps>();

  const getUserFirebase = async (id: string) => {
    const userRef = doc(db, "users", id);

    await getDoc(userRef).then((snapshot) => {
      const userSnapshot = snapshot.data();

      if (userSnapshot) {
        setUserAuth({
          email: userSnapshot.email,
          name: userSnapshot.name,
          UserID: userSnapshot.id,
          user: userSnapshot.user,
        });
      }
    });
  };

  async function checkLogin() {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        getUserFirebase(user.uid);
      } else {
        setUserAuth(undefined);
      }
    });
  }
  useEffect(() => {
    if (userAuth !== undefined) return;

    checkLogin();
  }, []);

  useEffect(() => {
    if (userAuth === undefined) return;

    async function verifyUser() {
      if (pathname === "/user" && userAuth !== undefined) {
        push("/");
      }

      if (pathname === "/perfil" && userAuth === undefined) {
        push("/user");
      }
    }

    verifyUser();
  }, [pathname, userAuth]);

  const signIn = async (email: string, password: string) => {
    const user = await signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        return response.user;
      })
      .catch((err) => {});

    if (user) {
      await getUserFirebase(user.uid);
      push("/");
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    setUserAuth(undefined);
    push("/user");
  };

  const createUser = async ({
    email,
    name,
    password,
    user,
  }: createUserModelProps) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((response) => {
      return response.user;
    });

    await setDoc(doc(db, "users", response.uid), {
      id: response.uid,
      email,
      user,
      name,
      created_at: response.metadata.creationTime,
    });

    return;
  };

  return (
    <AuthContext.Provider value={{ userAuth, signIn, createUser, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
