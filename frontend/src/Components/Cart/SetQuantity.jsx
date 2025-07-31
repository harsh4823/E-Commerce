const SetQuantity = ({
    quantity,
    cardCouter,
    handleQtyIncrease,
    handleQtyDecrease,
}) => {
    return (
        <div className="flex gap-8 items-center">
            {cardCouter ? null : <div className="font-semibold">QUANTITY</div>}
            <div className="flex md:flex-row flex-col gap-4 text-center lg:text-[22px] text-sm">
                <button
                    className="border-[1.2px] border-slate-800 px-3 rounded cursor-pointer"
                    onClick={handleQtyDecrease}
                >
                    -
                </button>

                <div className="text-rose-500">{ quantity }</div>

                <button
                    className="border-[1.2px] border-slate-800 px-3 rounded cursor-pointer"
                    onClick={handleQtyIncrease}
                >
                    +
                </button>
            </div>
        </div>
    )
};

export default SetQuantity;