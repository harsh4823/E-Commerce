import { formatPrice, formatRevenue } from 'c:/Users/HP/OneDrive/Desktop/Projects/E-Commerce/frontend/src/Utils/formatPrice'
import React from 'react'

const DashboardOverview = ({ title, amount, Icon, revenue = false }) => {
    const convertedAmount = Number(amount).toFixed(2);
  return (
    <>
          <div className='xl:w-80 w-full space-y-4 text-center md:text-start px-5 py-8'>
              <div className='flex md:justify-start justify-center items-center gap-2'>
                  <h3 className='uppercase text-2xl text-slate-700 font-semibold'>{ title }</h3>
                  <Icon className='text-slate-800 text-2xl'/>
              </div>
              <h1 className='font-bold text-slate-800 text-3xl'>
                  {console.log(formatRevenue(amount))}
                  {revenue? "₹ " + (formatRevenue(amount)): convertedAmount}
              </h1>
          </div>    
    </>
  )
}

export default DashboardOverview