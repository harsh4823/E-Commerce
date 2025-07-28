import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
    return(
        <div
            className="flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center"
            style={{backgroundImage: "url('')"}}>
            
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-4xl font-bold text-center mb-6">Contact us</h1>
                <p className="text-gray-600 text-center mb-4">
                    We would love to hear from you! Please fill out the form below or contact us directly
                </p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input 
                            type="text"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus: ring-blue-500"/>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input 
                            type="email"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus: ring-blue-500"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea 
                            rows="4"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus: ring-blue-500"/>
                    </div>
                    </form>
                    </div>
                </div>
    );
}

export default Contact;