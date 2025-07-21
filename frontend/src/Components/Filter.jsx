import {useState} from "react";
import {FiArrowUp, FiRefreshCcw, FiRefreshCw, FiSearch} from "react-icons/fi";
import {Button, MenuItem, Select, Tooltip} from "@mui/material";
import {FormControl, InputLabel} from "@mui/material";

const Filter = () => {

    const categories = [
        { categoryId: 1, categoryName: 'Electronics' },
        { categoryId: 2, categoryName: 'Books' },
        { categoryId: 3, categoryName: 'Clothing' },
        { categoryId: 4, categoryName: 'Home Appliances' },
        { categoryId: 5, categoryName: 'Sports' }
    ];

    const [category,setCategory] = useState("all");

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    }

    return(
        <div className={'flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4'}>

            {/*Search Bar*/}
            <div className={'relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full'}>
                <input type="text"
                       className={'border border-gray-400 text-slate-800 w-full rounded-md py-2 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#1976d3]'}
                       placeholder={'Search Products'}/>
                <FiSearch className={'absolute left-3 text-slate-800 size-{20}'}/>
            </div>

            {/*Category Filter*/}
            <div className={'flex sm:flex-row flex-col gap-4 items-center'}>
                <FormControl className={'text-slate-800 border-slate-700'}
                variant={'outlined'} size={'small'}>
                    <InputLabel id={'category-select-label'}>Category</InputLabel>
                    <Select variant={'outlined'} labelId={'category-select-label'}
                            value={category} onChange={handleChangeCategory} label='Category'
                    className={'min-w-[120px] text-slate-800 border-slate-700'}>
                    <MenuItem value={'All'}>All</MenuItem>
                    {categories.map((category)=>{
                        return(
                            <MenuItem value={category.categoryName} key={category.categoryId}>{category.categoryName}</MenuItem>
                        )
                    })}
                    </Select>
                </FormControl>

                {/*Sort Button and Clear Button*/}
                <Tooltip title={'Sorted By Price : asc'} children={''}>
                    <Button variant={'contained'} color={'primary'} className={'flex items-center gap-2 h-10'}>
                        Sort By
                        <FiArrowUp size={20}/>
                    </Button>
                </Tooltip>
                <button className={'flex items-center justify-center gap-2 bg-rose-900 ' +
                    'text-white px-3 py-2 cursor-pointer rounded-md transition duration-300 ease-in ' +
                    'shadow-md focus:outline-none'}>
                    <FiRefreshCw className={'font-semibold'} size={16}/>
                   <span className={'font-semibold'}>Clear Filter</span>
                </button>
            </div>
        </div>
    )

}

export default Filter;