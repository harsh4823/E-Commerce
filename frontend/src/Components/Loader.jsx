import {InfinitySpin} from "react-loader-spinner";

const Loader = ({text}) => {
    return (
        <div className="flex items-center justify-center h-[400px] flex-col gap-4">
            <InfinitySpin
                visible={true}
                width="200"
                color={'#4f46e5'}
                ariaLabel="infinity-spin-loading"
            />
            <p className={'text-slate-800 text-lg font-medium mt-4'}>
                {text || "Loading... Please wait."}
            </p>
        </div>
    );
}

export default Loader;