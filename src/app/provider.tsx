"use client";
import { ReactNode } from "react";
import { VideoDataProvider } from "./_context/VideoDataContext";
import {
  UserDataProvider,
} from "./_context/UserDetailContext";

type ProviderProps = {
  children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {

  return (
    <UserDataProvider>
      <VideoDataProvider>
          <div>{children}</div>
      </VideoDataProvider>
    </UserDataProvider>
  );
};

export default Provider;
