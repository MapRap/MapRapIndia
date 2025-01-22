"use client";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const router = useRouter();
  // const [verified, setVerified] = useState(false);
  // useEffect(() => {
  //   const getVerified = async () => {
  //     const veri = await verifiedStudents();
  //     if (veri === true) setVerified(veri);
  //   };
  //   getVerified();
  // }, [setVerified]);

  return (
    <div className="m-0 p-0">
      {/* {verified ? ( */}
      <img
        src={`../logo.png`}
        alt="logo"
        width={80}
        className="rounded-lg cursor-pointer absolute top-4 left-2"
        onClick={() => {
          window.location.replace("/");
        }}
      />
      <div className="m-0 p-0 ">
        {/* <div className="flex justify-center"></div> */}
        {/* <img src="../img5.webp" alt="" className="absolute z-[-10]" /> */}
        {/* <div className="bg-black absolute z-10 top-10 h-screen opacity-75"></div> */}
        {children}
      </div>
      {/* ) : (
        <div className="flex items-center justify-center text-3xl text-center text-white  h-screen">
          <img src="../img5.webp" alt="" className="absolute z-[-10]" />

          <div className="flex flex-col bg-black">
            Your account has been sent for verification and you will be able to
            access this page soon after your account is verified
            <Button
              className="bg-blue-800 hover:bg-blue-900 rounded-none"
              onClick={() => {
                router.push("/");
              }}
            >
              Go to home page
            </Button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Layout;
