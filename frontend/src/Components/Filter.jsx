import {useEffect, useState} from "react";
import {FiArrowDown, FiArrowUp, FiRefreshCcw, FiRefreshCw, FiSearch} from "react-icons/fi";
import {Button, MenuItem, Select, Tooltip} from "@mui/material";
import {FormControl, InputLabel} from "@mui/material";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategory} from "../store/action/categoryAction.js";

const Filter = () => {

    // const categories = [
    //     { categoryId: 1, categoryName: 'Computer & Laptop Accessories' },
    //     { categoryId: 2, categoryName: 'Electronics & Gadgets' },
    //     { categoryId: 3, categoryName: 'Smart Home & Lighting' },
    //     { categoryId: 4, categoryName: 'Fitness & Health' },
    //     { categoryId: 5, categoryName: 'Kitchen & Home Appliances' },
    //     { categoryId: 6, categoryName: 'Outdoor & Lifestyle' }
    // ];

    const {categories} = useSelector(
        state => state.categories
    );

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchCategory());
    },[dispatch]);

    const [searchParams] = useSearchParams();
    let URLParams = URLSearchParams;
    URLParams = new URLSearchParams(searchParams);
    const path = useLocation().pathname;
    const navigate = useNavigate();

    const [category,setCategory] = useState("all");
    const [sortOrder,setSortOrder] = useState("asc");
    const [searchTerm,setSearchTerm] = useState("");

    useEffect(()=>{
        const currentCategory = searchParams.get('category') || 'all';
        const currentSortOrder = searchParams.get('sortBy') || 'asc';
        const currentSearchTerm = searchParams.get('keyword') || '';

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
    },[searchParams]);

    useEffect(()=>{

        const handler = setTimeout(()=>{
            if (searchTerm){
                URLParams.set('keyword',searchTerm);
            }else{
                URLParams.delete('keyword');
            }
            navigate(`${path}?${URLParams}`);
        },700);

        return()=>{
            clearTimeout(handler);
        }

    },[searchParams, searchTerm, navigate, path, URLParams]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;

        if(selectedCategory==='all'){
            URLParams.delete('category');
        }else{
            URLParams.set('category',selectedCategory);
        }
        navigate(`${path}?${URLParams}`)
        setCategory(event.target.value);
    }

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = (prevOrder==='asc') ? 'desc' : 'asc';
            URLParams.set('sortBy',newOrder);
            navigate(`${path}?${URLParams}`);
            return newOrder;
        });
    }

    const handleClearFilter= () => {
        navigate({pathname : window.location.pathname});
        setCategory('all');
        setSortOrder('asc');
        setSearchTerm('');
    }

    return(
        <div className={'flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4'}>

            {/*Search Bar*/}
            <div className={'relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full'}>
                <input type="text"
                       className={'border border-gray-400 text-slate-800 w-full rounded-md py-2 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#1976d3]'}
                       placeholder={'Search Products'}
                value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                <FiSearch className={'absolute left-3 text-slate-800 size-{20}'}/>
            </div>

            {/*Category Filter*/}
            <div className={'flex sm:flex-row flex-col gap-4 items-center'}>
                <FormControl className={'text-slate-800 border-slate-700'}
                variant={'outlined'} size={'small'}>
                    <InputLabel id={'category-select-label'}>Category</InputLabel>
                    <Select variant={'outlined'} labelId={'category-select-label'}
                             onChange={handleCategoryChange} label='Category'
                    className={'min-w-[120px] text-slate-800 border-slate-700'}
                            value={searchParams.get('category') || 'all'}>
                    <MenuItem value={'all'} >All</MenuItem>
                    {categories.map((category)=>{
                        return(
                            <MenuItem value={category.categoryName} key={category.categoryId}>
                                {category.categoryName}
                            </MenuItem>
                        )
                    })}
                    </Select>
                </FormControl>

                {/*Sort Button and Clear Button*/}
                <Tooltip title={'Sorted By Price : asc'} children={''}>
                    <Button variant={'contained'} color={'primary'} className={'flex items-center gap-2 h-10'}
                            onClick={toggleSortOrder}>
                        Sort By
                        {sortOrder==='asc' ? (
                            <FiArrowUp size={20}/>
                        ): (
                            <FiArrowDown size={20}/>
                        )
                        }
                    </Button>
                </Tooltip>
                <button className={'flex items-center justify-center gap-2 bg-rose-900 ' +
                    'text-white px-3 py-2 cursor-pointer rounded-md transition duration-300 ease-in ' +
                    'shadow-md focus:outline-none'}
                    onClick={handleClearFilter}>
                    <FiRefreshCw className={'font-semibold'} size={16}/>
                   <span className={'font-semibold'}>Clear Filter</span>
                </button>
            </div>
        </div>
    )

}

export default Filter;