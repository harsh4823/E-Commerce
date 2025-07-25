import {Pagination} from "@mui/material";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

const Paginations = ({numberOfPages}) => {

    const [searchParams] = useSearchParams();
    const URLParams = new URLSearchParams(searchParams);
    const navigate = useNavigate();
    const pathName = useLocation().pathname;

    const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const handlePageChange = (event,value) => {
        URLParams.set('page', value);
        navigate(`${pathName}?${URLParams}`);
    }


    return(
        <div className={'flex justify-center w-full items-center pt-10'}>
            <Pagination
                page={currentPage}
                count={numberOfPages}
                size={'large'}
                shape={'rounded'}
                variant={'outlined'}
                defaultPage={currentPage}
                siblingCount={1}
                value={currentPage}
                onChange={handlePageChange}
            />
        </div>
    )
}

export default Paginations;