import React from "react";
import {
  AuthBindings,
  Authenticated,
  Refine,
} from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import CustomLayout from "./components/CustomLayout";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";

import CustomDocumentTitleHandler from "./components/fields/CustomTitleHandler";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";


import { Login } from './pages/login';
import  HomePage from './pages/home';
import  AllData from './pages/all-data';
import MyData from './pages/my-data';
import PredictiveModels from './pages/predictive-models';
import Sandbox from './pages/sandbox';
import { parseJwt } from "./utils/parse-jwt";
import EditData from './pages/edit-data';
import CreateData from './pages/create-data';
import DeleteData from './pages/delete-data';
import DataDetails from "./pages/dataDetails";

import {
  Dataset,
  Code,
  DataThresholding,
  FolderSpecial,
  SpaceDashboard,
  CottageSharp,
} from '@mui/icons-material'


const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer {token}`;
  }

  return config;
});


function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      if (!credential) {
        return {
          success: false,
          error: new Error("No credential provided"),
        };
      }
      const profileObj = parseJwt(credential);

      if (profileObj) {
        const response = await fetch('http://localhost:8080/api/v1/users',{
          method: 'POST',
          headers: { 'Content-Type':'application/json'},
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          })
        })
        const data = await response.json();

        if(response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id
            })
          );
          localStorage.setItem("token", `${credential}`);
          return {
            success: true,
            redirectTo: "/",
          };
        } else {
          return {
            success: false,
          };
        }
      } else {
        return {
          success: false,
        };
      }

      //   return {
      //     success: true,
      //     redirectTo: "/",
      //   };
      // }

      // return {
      //   success: false,
      // };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("http://localhost:8080/api/v1")}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  // {
                  //   name: "Home",
                  //   options: {label: 'Home'},
                  //   icon: < SpaceDashboard />,
                  //   list: HomePage,
                  // },
                  {
                    name: "data",
                    list: AllData,
                    show: DataDetails,
                    create: CreateData,
                    edit: EditData,
                    icon: < FolderSpecial />,
                  },
                  {
                    name: "sandbox",
                    options: {label: 'Sandbox'},
                    icon: < Code />,
                    list: Sandbox,
                  },
                  {
                    name: "predictive-models",
                    icon: < DataThresholding />,
                    list: PredictiveModels,
                  },
                  // {
                  //   name: "my-data",
                  //   icon: < FolderSpecial />,
                  //   list: MyData,
                  // },
                ]}

                


                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "EUYe8X-xbcBWO-GZPYlk",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <CustomLayout>
                          <Outlet />
                        </CustomLayout>
                      </Authenticated>
                    }
                  >
                   <Route index element={<HomePage/>} /> {/* Default Route */}
                    <Route path="/dashboard" element={<HomePage/>} />
                    
                    <Route
                      index
                      element={<NavigateToResource resource="data" />}
                    />
                    <Route path="/data">
                      <Route index element={<AllData />} />
                      <Route path="create" element={<CreateData />} />
                      <Route path="edit/:id" element={<EditData />} />
                      <Route path="show/:id" element={<DataDetails />} />
                      <Route path="delete/:id" element={<DeleteData />} />
                    </Route>
                    <Route path="/sandbox">
                      <Route index element={<Sandbox />} />
                      {/* <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} /> */}
                    </Route>
                    <Route path="/predictive-models">
                      <Route index element={<PredictiveModels />} />
                      {/* <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} /> */}
                    </Route>
                    <Route path="/my-data">
                      <Route index element={<MyData />} />
                      {/* <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} /> */}
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <CustomDocumentTitleHandler />
              </Refine>
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
