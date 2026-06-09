import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router";
import { Provider, useDispatch } from "react-redux";
import { persistor, store } from "./store";
import { useWallet } from "./hooks/useWallet";
import { setSocketfiSession } from "./store/socketfiAuthSlice";
import { PersistGate } from "redux-persist/integration/react";
import ReactQueryProviders from "./components/ReactQueryProviders";
import { AuthProvider } from "./context/AuthContext";
import { QuestProvider } from "./context/QuestContext";
import { SocketFiProvider } from "@socketfi/react";
import { router } from "./router";

export default function AppProviders() {
  const dispatch = useDispatch();
  const { closeAuthModal } = useWallet();

  return (
    <PersistGate loading={<>Loading....</>} persistor={persistor}>
      <ReactQueryProviders>
        <QuestProvider>
          <AuthProvider>
            <SocketFiProvider
              config={{
                clientId: import.meta.env.VITE_SOCKETFI_CLIENT_ID,
                network: import.meta.env.VITE_SOCKETFI_NETWORK || "TESTNET",
                brand: {
                  appName: "Contribute",
                  primaryColor: "#2F0FD1",
                },
                onAuthSuccess: (data) => {
                  console.log("SocketFi session data:", data);

                  if (data?.session) {
                    closeAuthModal();
                    dispatch(
                      setSocketfiSession({
                        userProfile: data.session.userProfile,
                        accessToken: data.session.socketfiAccessToken,
                      }),
                    );
                  }

                  toast.success("SocketFi login successful");
                },
                onTransactionSuccess(result) {
                  console.log("Transaction result from onTransactionSuccess", result);
                },

                onError: (error) => {
                  toast.error(error?.message || "SocketFi login failed");
                },
              }}
            >
              <RouterProvider router={router} />
            </SocketFiProvider>
          </AuthProvider>
        </QuestProvider>
      </ReactQueryProviders>
    </PersistGate>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="bottom-right"
      autoClose={2500}
      hideProgressBar
      closeButton={false}
      newestOnTop
      pauseOnHover
      draggable
      toastClassName="!rounded-xl !border !border-[#EAECF0] !bg-white !shadow-lg !text-sm !text-[#101828]"
      bodyClassName="!p-3"
    />

    <Provider store={store}>
      <AppProviders />
    </Provider>
  </StrictMode>,
);
