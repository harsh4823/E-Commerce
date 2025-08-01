import { SpinnerInfinity } from "spinners-react";

const Loader = ({text}) => {
    return (
        <div className="flex items-center justify-center h-[400px] flex-col gap-4">
            <SpinnerInfinity size={100} thickness={100} speed={180} color="blue"  secondaryColor="rgba(0, 0, 0, 0.19)" />
            <p className={'text-slate-800 text-lg font-medium mt-4'}>
                {text || "Loading... Please wait."}
            </p>
        </div>
    );
}

export default Loader;