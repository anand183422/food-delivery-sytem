const Footer = () => {
  const currYear = new Date().getFullYear();
  return (
    <footer className="bg-green-700 
             text-xl text-white text-center 
             border-t-4 border-red-500 
             
             inset-x-0 
             bottom-0 
             p-4">
      <p>
        Copyright &copy; {currYear}, Made with 💗 by <strong>Anand</strong>
      </p>
    </footer>
  );
};

export default Footer;
