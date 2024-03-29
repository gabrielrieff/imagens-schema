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

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { authUserModelProps, createUserModelProps } from "~/model/userModel";
import { ImageProps } from "~/app/@types/imagetype";
import { getImages } from "~/helpers/getImages";
import { loadImages } from "~/helpers/loadImages";
import { toast } from "react-toastify";

type AuthContextData = {
  userAuth?: authUserModelProps;
  signIn: (email: string, password: string) => void;
  signOutUser: () => void;
  createUser: ({
    email,
    firstName,
    lastName,
    password,
    user,
  }: createUserModelProps) => void;

  images: Array<ImageProps>;
  setImages: Dispatch<SetStateAction<Array<ImageProps>>>;

  limitedImages: number;
  setLimitedImages: Dispatch<SetStateAction<number>>;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();
  const pathname = usePathname();

  const [userAuth, setUserAuth] = useState<authUserModelProps>();
  const [images, setImages] = useState<Array<ImageProps>>([]);
  const [limitedImages, setLimitedImages] = useState<number>(5);

  const getUserFirebase = async (id: string) => {
    const userRef = doc(db, "users", id);

    await getDoc(userRef).then((snapshot) => {
      const userSnapshot = snapshot.data();

      if (userSnapshot) {
        setUserAuth({
          email: userSnapshot.email,
          firstName: userSnapshot.firstName,
          lastName: userSnapshot.lastName,
          UserID: userSnapshot.id,
          user: userSnapshot.user,
        });
      }
    });
  };

  useEffect(() => {
    if (userAuth !== undefined) return;

    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        getUserFirebase(user.uid);
      }
    });

    return;
  });

  async function verifyUser() {
    if (pathname === "/user" && userAuth !== undefined) {
      return push("/");
    }

    if (
      (pathname === "/perfil" || pathname === "/imagem") &&
      userAuth === undefined
    ) {
      return push("/user");
    }
  }

  useEffect(() => {
    loadImages(setImages, limitedImages);
    getImages(setImages, limitedImages);
  }, [limitedImages]);

  useEffect(() => {
    return () => {
      verifyUser();
    };
  }, [pathname, userAuth]);

  const signIn = async (email: string, password: string) => {
    const user = await signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        toast.success("Login efetuado com sucesso, ja vamos te redirecionar");
        return response.user;
      })
      .catch((err) => {
        toast.error(
          "Erro ao tentar logar, por favor verifique os dados de login"
        );
      });

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
    firstName,
    lastName,
    password,
    user,
  }: createUserModelProps) => {
    try {
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
        firstName,
        lastName,
        created_at: response.metadata.creationTime,
      });

      toast.success("Usúario criado com sucesso");
    } catch (error) {
      toast.error("Não foi possivel cadastrar o usúario");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userAuth,
        signIn,
        createUser,
        signOutUser,
        images,
        setImages,
        limitedImages,
        setLimitedImages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
