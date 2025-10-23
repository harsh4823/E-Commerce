import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const SelectTextField = ({
    label,
    select,
    setSelect,
    lists,
}) => {
    return (
        <Listbox value={select} onChange={setSelect}>
        <div className="flex flex-col gap-2 w-full">
            <label
                htmlFor="id"
                className={`font-semibold text-sm text-slate-800`}>
                {label}
                </label>
                
                <div className="relative">
                    <ListboxButton className="relative text-sm py-2 px-2 rounded-md border border-slate-700 w-full cursor-default bg-white text-left text-black sm:leading-6">
                        <span className="block truncate ps-2">
                            {select?.categoryName}
                            <MdKeyboardArrowDown aria-hidden={true} className="absolute right-2.5 top-2.5 size-4 group pointer-events-none" />
                        </span>
                    </ListboxButton>

                    <ListboxOptions transition className={'absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-hidden'}>
                    {lists.map((category) => (
                    <ListboxOption
                        className={'group relative cursor-default py-2 pl-3 pr-9 text-gray-900 data-focus:bg-blue-600 data-focus:text-white'}
                        key={category.categoryId}
                        value={category}
                        >
                        <span className="block truncate font-semibold group-data-selected:font-semibold"> {category.categoryName}</span>
                            <span className="absolute right-0 flex items-center pr-4 text-indigo-600 group-data-focus:text-white [.group:not([data-selected])_&]:hidden">
                            </span>
                    </ListboxOption>
                    ))}
                </ListboxOptions>
                </div>
        </div>
    </Listbox>
    )
};

export default SelectTextField;