import { createContext, useCallback, useContext, useEffect, useState } from "react";

export interface IUser {
  name: string;
  avatar_url: string;
}

interface IAuthContextData {
  isLogged: boolean;
  user: IUser | null;
  signIn(user: IUser): void;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

interface IAuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: IAuthProviderProps): JSX.Element {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storagedIsLogged = localStorage.getItem('@MoveIt:isLogged');

    if(storagedIsLogged) setIsLogged(JSON.parse(storagedIsLogged));

    const storagedUser = localStorage.getItem('@MoveIt:user');

    if(storagedUser) setUser(JSON.parse(storagedUser));
  }, [])

  const signIn = useCallback((user: IUser) => {
    localStorage.setItem("@MoveIt:isLogged", JSON.stringify(true));
    localStorage.setItem("@MoveIt:user", JSON.stringify(user));

    setIsLogged(true);
    setUser(user);
  }, []);

  const signOut = useCallback(() => {
    localStorage.clear();

    setIsLogged(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
