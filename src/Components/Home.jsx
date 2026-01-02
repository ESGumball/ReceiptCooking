import { useState, useEffect } from "react";

const Home = () => {
  const [data, setdata] = useState(null);
  const [monan, setMonan] = useState("Arrabiata");
  const [input, setInput] = useState("Arrabiata");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(monan)}`);
  
          if (!res.ok) throw new Error("Lỗi !");
  
          const data = await res.json();
  
          if (!data.meals) {
          throw new Error("Không tìm thấy món ăn");
          }
  
          setdata(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      setLoading(true);
      setError(null);
  
      fetchUsers();
    }, [monan]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Lỗi: {error}</p>;
  return (
    <div className='container max-w-screen min-h-screen h-100'>
        <header className='w-full h-1/10 p-5 flex justify-between text-center bg-blue-200'>
            <h1 className='font-bold text-blue-600 text-2xl'> ESGUMBALL </h1>
            <div className='flex gap-5'>
                <input
                value={input}
                placeholder='Vui lòng nhập tên món bạn muốn'
                onChange={(e) => setInput(e.target.value)}
                className='bg-blue-400 px-5 outline-none rounded-xl text-blue-50 w-90'
                type="text" />
                <button 
                onClick={() => setMonan(input)}
                className='bg-blue-400 p-2 rounded-xl font-semibold text-blue-50 cursor-pointer' > Tìm kiếm </button>
            </div>
            <h1></h1>
        </header>
        <section className='w-full h-9/10 bg-blue-400 p-17 flex flex-col text-center'>
            <div className='bg-blue-100 mx-80 flex text-center p-3 rounded-xl max-h-200 overflow-y-auto'>
                <div className='w-1/2'>
                    <img src={data?.meals?.[0]?.strMealThumb} className="w-80"/>
                </div>
                <div className='w-1/2 flex flex-col text-left space-y-3'>
                    <h1 className="text-2xl font-bold text-center"> {data?.meals?.[0]?.strMeal} </h1>
                    <h1 className="text-lg font-semibold"> {data?.meals?.[0]?.strCategory}</h1>
                    <h1 className="text-lg font-semibold"> {data?.meals?.[0]?.strArea}</h1>
                    <h1> "{data?.meals?.[0]?.strInstructions}" </h1>
                    <h1 className="text-lg text-red-500 font-bold text-center"> <a href={data?.meals?.[0]?.strYoutube}> Video hướng dẫn </a> </h1>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Home
