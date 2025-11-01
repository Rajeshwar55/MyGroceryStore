import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Category = () => {
  const {navigate} =useAppContext();
  return (
    <div className='mt-16'>
    <h1 className='text-2xl md:text-3xl font-medium'>Category</h1>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>
      {categories.map((Category,index)=>(
        <div key={index} className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center'
        style={{backgroundColor:Category.bgColor}}
        onClick={()=>{
            navigate(`/products/${Category.path.toLocaleLowerCase()}`);
            scrollTo(0,0)
        }}>
        <img src={Category.image} alt={Category.text}  className='group-hover:scale-108 transition max-w-28'/>
        <p className='text-sm font-medium'>{Category.text}</p>
      </div>
      ))}
     
    </div>
    </div>
  )
}

export default Category