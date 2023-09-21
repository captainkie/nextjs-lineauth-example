import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";
import { apiUrl, apiTokens, lineApiTokens } from "../../lib/constants";
import { info } from "autoprefixer";
import { fetchData } from "../../lib/api";

const Home = ({ resSetting, liff, liffError, unlinkdls }) => {
  const [openLoader, setOpenLoader] = useState(false);
  const [openBoxWelcome, setOpenBoxWelcome] = useState(true);

  const [richMenuID, setRichMenuID] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState([]);
  useEffect(() => {
    setRichMenuID(resSetting.data?.attributes.richMenuID);
    setWelcomeMessage(resSetting.data?.attributes.message);
  }, [resSetting.data?.attributes]);

  const showBoxRegister = () => {
    hideAllBox();
    setOpenBoxRegister(true);
  };
  const showBoxRegisterSuccess = () => {
    hideAllBox();
    setOpenBoxRegisterSuccess(true);
  };
  const showBoxRegisterNotSuccess = () => {
    hideAllBox();
    setOpenBoxRegisterNotSuccess(true);
  };
  const showBoxCancelDealer = () => {
    hideAllBox();
    setOpenBoxCancelDealer(true);
  };
  const showBoxCancelDealerSuccess = () => {
    hideAllBox();
    setOpenBoxCancelDealerSuccess(true);
  };

  const hideAllBox = () => {
    setOpenBoxWelcome(false);
  };

  // line liff get context
  const [context, setContext] = useState({});
  useEffect(() => {
    try {
      liff.ready.then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          setContext(liff.getContext());
        }
      });
    } catch (error) {}
  }, [liff]);

  useEffect(() => {
    if (!unlinkdls && Object.keys(context).length) {
      showBoxRegister();
    } else if (unlinkdls && Object.keys(context).length) {
      showBoxCancelDealer();
    }
  }, [context.userId]);

  // close liff window
  const closeLiff = () => {
    liff.closeWindow();
  };

  return (
    <>
      <PageSEO
        title={`${siteMetadata.title}`}
        description={siteMetadata.description}
      />

      {/* loader */}
      {openLoader && (
        <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-white/80">
          <BarLoader color="#EC6B1E" />
        </div>
      )}
      {/* end loader */}

      <div className="container max-w-[480px]">
        {/* box-welcome */}
        {openBoxWelcome && (
          <div className="box-register-success pt-[130px] text-center">
            <h2 className="title-lg mb-5">Logged in ...</h2>
            {liff && <p>Please waiting ...</p>}
            {liffError && (
              <>
                <p>
                  Sorry, this service is not available on your device.
                </p>
                <p>
                  <code>{liffError}</code>
                </p>
              </>
            )}
          </div>
        )}
        {/* end box-welcome */}
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { query } = context;
  const unlinkdls = query.unlinkdls ?? false;

  const reqSetting = await fetchData(`api/setting`);
  const [resSetting] = await Promise.all([reqSetting]);

  return {
    props: {
      resSetting,
      unlinkdls,
    },
  };
};

export default Home;
