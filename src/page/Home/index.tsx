import { useState } from "react";
import imageOne from "../../assets/_23-2151120057.avif";
import imageTow from "../../assets/_52683-148822.avif";
import imageThree from "../../assets/_52683-90115.avif";
import imageFour from "../../assets/_52683-92622.avif";
import GallerySlider from "../../component/slider";
const Home = ({ images }: { images: [] }) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `/search?query=${searchValue}`;
  };
  return (
    <div className="flex-grow relative hero-section flex flex-col items-center  p-20 px-32 pb-10 bg-[#FFEDE5] text-center">
      <div>
        <div className="">
          <h1 className="text-4xl font-bold text-neutral-950 mb-5 ">
            أستمتع بجمال اللحظة واحتفظ بها إلى الأبد.
          </h1>
          <p className="text-gray-500 text-md  mb-5">
            استوحي إبداعك من تشكيلتنا الفريدة من الصور الرائعة! اكتشف عالم
            الجمال والتفرد مع مجموعة مذهلة من الصور المبتكرة، فكل لحظة تروي قصة
            مختلفة.{" "}
          </p>
        </div>
        <div className="box pt-6 ">
          <div className="box-wrapper">
            <form
              method="#"
              onSubmit={handleSubmit}
              className=" bg-white rounded flex items-center w-full p-4 shadow-sm border border-gray-200"
            >
              <button type="submit" className="outline-none focus:outline-none">
                <svg
                  className=" w-10 text-gray-600 h-5 cursor-pointer"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>

              <input
                type="search"
                name="search"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="البحث عن صور"
                x-model="q"
                className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
              />
              <div className="select">
                <select
                  defaultValue={"photo"}
                  x-model="image_type"
                  // onChange={(e) => setSelect(e.target.value)}
                  className="text-sm outline-none focus:outline-none bg-transparent"
                >
                  <option value="categories">تصنيف</option>
                  <option value="resource">صور</option>
                  <option value="illustration">رسمة</option>
                  <option value="vector">فيكتور</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-row gap-12 justify-center flex-wrap items-center mt-20">
          <div>
            <div className=" border-2 p-1  rounded-xl border-gray-500 overflow-hidden">
              <div className="image-container w-[200px] h-[111px] overflow-hidden rounded-lg hover:scale-125 transition-all duration-500  ">
                <img src={imageOne} className="object-cover " alt="" />
              </div>
            </div>
            <span>عنوان </span>
          </div>
          <div>
            <div className=" border-2 p-1  rounded-xl border-gray-500 overflow-hidden">
              <div className="image-container w-[200px] h-[111px] overflow-hidden rounded-lg hover:scale-125 transition-all duration-500   ">
                <img src={imageTow} className="object-cover" alt="" />
              </div>
            </div>
            <span>عنوان </span>
          </div>
          <div>
            <div className=" border-2 p-1  rounded-xl border-gray-500 overflow-hidden">
              <div className="image-container w-[200px] h-[111px] overflow-hidden rounded-lg hover:scale-125 transition-all duration-500   ">
                <img src={imageThree} className="object-cover" alt="" />
              </div>
            </div>
            <span>عنوان </span>
          </div>
          <div>
            <div className=" border-2 p-1  rounded-xl border-gray-500 overflow-hidden">
              <div className="image-container w-[200px] h-[111px] overflow-hidden rounded-lg hover:scale-125 transition-all duration-500   ">
                <img src={imageFour} alt="" className="object-cover" />
              </div>
            </div>
            <span>عنوان </span>
          </div>
        </div>
      </div>
      <GallerySlider images={images} />
    </div>
  );
};

export default Home;
