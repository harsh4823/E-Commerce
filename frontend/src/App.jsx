import {FaBeer} from "react-icons/fa";
import {toast, Toaster} from "react-hot-toast";

function App() {

    function handleOnClick() {
        toast.success('Welcome to the App!',{
            className:"text-xs"
        });
    }
    return(
        <div className="text-4xl font-bold flex flex-col items-center justify-center h-screen text-white bg-gray-700">
            <Toaster
            gutter={1}
            />
            Hello, World! <FaBeer/>

            <button
                className="mt-3 text-xl bg-white rounded-lg text-black p-2 hover:cursor-pointer"
                onClick={handleOnClick}>
                Welcome
            </button>

        </div>
    )
}

export default App
