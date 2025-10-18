import React, { useEffect } from 'react'
import DashboardOverview from './DashboardOverview'
import { FaBox, FaShoppingCart } from 'react-icons/fa'
import { RiMoneyRupeeCircleFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnalyticsData } from 'c:/Users/HP/OneDrive/Desktop/Projects/E-Commerce/frontend/src/store/action/adminAction'

const Dashboard = () => {
    const { productCount, totalRevenue, totalOrders } = useSelector(state => state.admin);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAnalyticsData());
    },[dispatch])
    
  return (
      <div className='min-w-full pr-10'>
          <div className='flex md:flex-row mt-8 flex-col lg:justify-between border border-slate-400 rounded-lg 
          bg-linear-to-r from-blue-50 to-blue-100 shadow-lg'>
              <DashboardOverview title={"Total Products"} amount={productCount} Icon={FaBox}/>
              <DashboardOverview title={"Total Orders"} amount={totalOrders} Icon={FaShoppingCart}/>
              <DashboardOverview title={"Total Revenue"} amount={totalRevenue} Icon={RiMoneyRupeeCircleFill} revenue/>
          </div>
    </div>
  )
}

export default Dashboard