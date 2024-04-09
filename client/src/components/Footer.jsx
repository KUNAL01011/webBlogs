import { Email } from "@mui/icons-material";
const Footer = () => {
  return (
    <div className="w-[80%] m-auto h-full text-white flex flex-col py-8 gap-8">
      <div className="flex justify-between">
        <div className="flex flex-col w-[250px] ">
          <h4 className="font-medium text-lg mb-2">About</h4>
          <p className="text-sm opacity-[0.8]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ui enim
            ad minim veniam
          </p>
          <h4 className="mt-4">
            Email:{" "}
            <span className="text-sm opacity-[0.8]">info@jstemplate.net</span>
          </h4>
          <h4 className="mt-4">
            Phone: <span className="text-sm opacity-[0.8]">880123456789</span>
          </h4>
        </div>
        <div>
          <h1 className="font-medium text-lg mb-2">Quick Link</h1>
          <ul className="flex flex-col text-sm gap-1 opacity-[0.8]">
            <li>Home</li>
            <li>About</li>
            <li>Blog</li>
            <li>Archived</li>
            <li>Author</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h1 className="font-medium text-lg mb-2">Quick Link</h1>
          <ul className="flex flex-col text-sm gap-1 opacity-[0.8]">
            <li>Home</li>
            <li>About</li>
            <li>Blog</li>
            <li>Archived</li>
            <li>Author</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="bg-[#242535] rounded-lg shadow-xl p-2">
          {" "}
          <div className="flex flex-col justify-center items-center">
            <h4 className="font-medium text-lg">Weekly Newsletter</h4>
            <p className="text-sm opacity-[0.8]">
              Get blog articles and offers via email
            </p>
            <div className="flex bg-[#141624] w-full justify-between rounded-lg mt-8 pr-2 pl-2 py-1">
              <input
                className="bg-inherit  outline-none border-none"
                type="text"
                placeholder="Your Email"
              />
              <Email />
            </div>
            <div className="flex bg-[#1b32db] w-full justify-center mt-1 py-1 rounded-lg items-center">
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] pt-4 border-gray-500 flex justify-between">
        <div className="text-sm opacity-[0.8]">
          <span>
            &#169; JS Template <span>2023, All Right Reserved</span>
          </span>
        </div>
        <div className="flex text-sm opacity-[0.9]">
          <span className="border-r-2 pl-4 pr-2 border-gray-500">
            Terms of Use
          </span>
          <span className="border-r-2 pl-4 pr-2 border-gray-500">
            Privacy Policy
          </span>
          <span className="border-r-2 pl-4 pr-2 border-gray-500">
            Cookie Policy
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
