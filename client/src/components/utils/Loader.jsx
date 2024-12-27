export default function Loader () {
  return (
    <div className='flex h-screen w-screen fixed bg-[#f1f1f1] top-0 left-0 z-[50] justify-center items-center' >
      <div className='loader'>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
     </div>
  )
}
