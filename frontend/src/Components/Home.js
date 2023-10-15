import { Link } from 'react-router-dom/cjs/react-router-dom.min'


const Home = () => {
  return (
      <>
        <div className="main_window">
          <div className="bg_img"></div>
          <div className="main_content">
              <h2 className='home_h2 mt-6 text-center text-5xl font-extrabold text-white'>Affilate Villa</h2>
              <p>We provide the best services for the discount seeker and discount proividers, through different deals sharing and you can enjoy the easy amazon affilate verification through us by sharing your shop and even earn through us.</p>
              <Link className="home_btn">Explore Products</Link>
          </div>
        </div>
      </>
  )
}

export default Home