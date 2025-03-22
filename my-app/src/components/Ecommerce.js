import ecom_img from "./ecom_img.png";

const Ecommerce = () => {
    return (
      <div className = "relative">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">About Us</h1>
        <br />
        <img src={ecom_img} alt="Ecommerce" className="w-full h-auto rounded-lg shadow-md mb-6" />
        <p className="text-gray-700 mb-4 leading-relaxed">
          Delivery Hub e-commerce portal is happy to list your brand items for free. You can list your services where
          customers get to see all your products and services with cost and other details. We offer free listing of your
          services, and payment and logistics can be managed by yourself.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          This will be a free listing service to Manteca and River Islands customers. Please contact
          <span className="font-semibold text-blue-600"> 510 714 6946</span> if you are interested.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Onboarding Process</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 bg-gray-100 p-4 rounded-lg shadow-md" style={styles.ol}>
          <li className="mb-2">We can create a custom page for your brand and service like this.</li>
          <li className="mb-2">We can list all your products and services in our portal.</li>
          <li className="mb-2">Include your brand in our weekly ad.</li>
        </ol>
      </div>
    );
};

const styles = {
    ol: {
        display: 'block',
        listStyleType: 'decimal',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        paddingInlineStart: '40px',
        unicodeBidi: 'isolate',
    },
};

export default Ecommerce;
