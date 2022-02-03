import axios from "../../axios";
import getToken from "./getToken";

export default (method, url, auth = false) => {
  method = method.toLowerCase();

  const f = async (
    reqData = {},
    id,
    {
      useError = true,
      useSuccess = false,
      useBubbling = false,
      headers = {},
    } = {},
    target
  ) => {
    // target element disabled
    const setTargetDisabled = (bool) => {
      if (!target) return;
      if (bool) {
        target.setAttribute("disabled", bool);
      } else {
        target.removeAttribute("disabled");
      }
    };
    setTargetDisabled(true);
    // remove :id
    let URL = id ? url.split(":id").join(id) : url;
    // get token 
    try {
      const options = {
        headers: {
          ...(auth
            ? getToken(url === "/user/token" && method === "patch")
            : {}),
          ...headers,
        },
      };
      console.log("options", options);
      let promise;
      // method handling
      if (["get", "delete"].includes(method)) {
        options.params = reqData;
        promise = axios[method](URL, options);
      } else {
        promise = axios[method](URL, reqData, options);
      }

      // call request 
      const response = await promise;
      // error handling
      if (response.status > 300) {
        throw useBubbling
          ? response
          : new Error(response.status.message || response.message);
      }
      // success handling
      if (useSuccess && response.status === 200) {
        if (typeof useSuccess === "boolean") {
          await alert(response.status.message);
        } else if (typeof useSuccess === "string") {
          await alert(useSuccess);
        }
      }
      return response.data || true;
    } catch (error) {
      // error handling
      if (error.message === "Network Error") {
        await alert("서버와의 통신에 실패했습니다.");
        return;
      }
      const message = error.isAxiosError
        ? error.message
        : error.response?.data?.message;
      if (useBubbling) throw message;
      if (useError) {
        if (typeof useError === "boolean") {
          await alert(message || "-");
          return;
        } else if (typeof useError === "string") {
          await alert(useError);
          return;
        }
      }
    } finally {
      setTargetDisabled(false);
    }
  };

  return f;
};
