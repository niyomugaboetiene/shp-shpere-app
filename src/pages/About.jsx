import { useState, useEffect } from "react";
import { FaRocket, FaHeart, FaGem, FaCompass, FaShoppingBag, FaUsers, FaAward, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import github from "../assets/github.jpeg"
import axios from "axios";

const AboutUs = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    happyCustomers: 0,
    ordersDelivered: 0,
    yearsExperience: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStoreStats();
  }, []);

  const fetchStoreStats = async () => {
    try {
      const productsRes = await axios.get("http://localhost:5000/product/getProduct", {
        withCredentials: true,
      });
      
      setStats({
        totalProducts: productsRes.data.products?.length || 1500,
        happyCustomers: 5,
        ordersDelivered: 0,
        yearsExperience: 1
      });
    } catch (error) {
      console.log("Error fetching stats:", error.message);
      setStats({
        totalProducts: 50,
        happyCustomers: 3,
        ordersDelivered: 0,
        yearsExperience: 3
      });
    } finally {
      setIsLoading(false);
    }
  };

  const coreValues = [
    {
      icon: <FaRocket className="text-2xl" />,
      title: "Innovation",
      description: "Constantly evolving with cutting-edge technology and modern design principles.",
      color: "text-gray-800"
    },
    {
      icon: <FaHeart className="text-2xl" />,
      title: "Customer First",
      description: "Every decision is made with our customers' experience in mind.",
      color: "text-gray-800"
    },
    {
      icon: <FaGem className="text-2xl" />,
      title: "Quality",
      description: "Only the finest products and most reliable services make it to our platform.",
      color: "text-gray-800"
    },
    {
      icon: <FaCompass className="text-2xl" />,
      title: "Vision",
      description: "Building the future of e-commerce with scalable, sustainable solutions.",
      color: "text-gray-800"
    }
  ];

  const features = [
    {
      title: "Seamless Shopping",
      description: "Intuitive interface designed for effortless browsing and purchasing.",
    },
    {
      title: "Secure Transactions",
      description: "Bank-level security protecting every transaction and personal data.",
    },
    {
      title: "Fast Delivery",
      description: "Optimized logistics network ensuring quick and reliable deliveries.",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer service for whenever you need assistance.",
    }
  ];

  const teamMembers = [
    {
      name: "Niyomugabo Etiene",
      role: "Full-Stack Developer",
      specialties: ["React", "Node.js", "MongoDB", "UI/UX"],
      avatar: "NE",
      quote: "Building digital experiences that matter"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading our story...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-green-500">
      <section className="relative py-24 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 text-green-500 bg-grad">
            ShopSphere
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-600">
            Where modern e-commerce meets exceptional user experience. 
            We're redefining online shopping with clean design and powerful technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              className="px-8 py-4 bg-green-500 text-white rounded-lg hover:scale-105 active:rounded-full transition-alln duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaShoppingBag />, value: stats.totalProducts, label: "Products", suffix: "+" },
              { icon: <FaUsers />, value: stats.happyCustomers, label: "Happy Clients", suffix: "+" },
              { icon: <FaAward />, value: stats.ordersDelivered, label: "Orders", suffix: "+" },
              { icon: <FaStar />, value: stats.yearsExperience, label: "Years", suffix: "+" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center group p-6 hover:border hover:border-green-100 hover:translate-y-3 rounded-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                  <div className="text-2xl text-white-700">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-black text-white mb-2">{stat.value}{stat.suffix}</div>
                <div className="text-white font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="values" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-green-500">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every aspect of ShopSphere
            </p>
          </div>
          
          <div className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-4 gap-6">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className="group p-8 bg-green-500 border rounded-2xl hover:shadow-2xl hover:translate-x-3 transition-all duration-500"
              >
                <div className="w-14 h-14 mb-6 rounded-xl bg-gray-100 flex items-center justify-center hover:scale-105 transition duration-200 text-green-500">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-white">
              Why Choose ShopSphere?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className=""
                >
                  <div className="flex items-center gap-4 hover:scale-105 transition duration-200 hover:translate-x-3">
                    <div>
                      <h3 className={`text-xl font-bold mb-2 text-white`}>
                        {feature.title}
                      </h3>
                      <p className="text-white">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
           </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-green-400">
              Our Story
            </h2>
          </div>
          
          <div className="bg-green-500 rounded-2xl p-12 shadow-sm border border-gray-200 hover:-translate-y-4 transition duration-200">
            <div className="prose prose-lg max-w-none text-white">
              <p className="text-xl leading-relaxed mb-6">
                ShopSphere was born from a simple observation: most e-commerce platforms were either 
                <span className="font-semibold text-gray-900"> overly complex</span> or 
                <span className="font-semibold text-gray-900"> lacking in modern design</span>. 
                We set out to change that.
              </p>
              
              <p className="text-xl leading-relaxed mb-6">
                Founded in 2024, our mission has been clear: create an e-commerce experience that's 
                <span className="font-semibold text-gray-900"> intuitive, fast, and beautiful</span>. 
                Every pixel, every line of code, every product selection is carefully curated to 
                ensure you have the best possible shopping experience.
              </p>
              
              <p className="text-xl leading-relaxed">
                Today, ShopSphere stands as a testament to what happens when 
                <span className="font-semibold text-gray-900"> modern technology</span> meets 
                <span className="font-semibold text-gray-900"> thoughtful design</span>. 
                We're not just building a store; we're crafting an experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-500">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-white">
              The Mind Behind ShopSphere
            </h2>
            <p className="text-xl text-white">The visionary architect crafting your shopping experience</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 hover:translate-y-2 transition duration-200">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="flex flex-col lg:flex-row items-center gap-12 p-12 rounded-3xl border border-white hover:border-gray-300 transition-all duration-500">
                  <img src={github} className="w-48 h-48 rounded-3xl  flex items-center justify-center text-white text-5xl font-black shadow-2xl group-hover:scale-105 transition-transform duration-300" />
                  
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-3xl font-black text-white mb-3">{member.name}</h3>
                    <div className="text-white text-xl font-bold mb-4">{member.role}</div>
                    <div className="text-lg text-white italic mb-6">"{member.quote}"</div>
                    
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                      {member.specialties.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-4 py-2  border border-gray-300 rounded-full text-white text-sm font-medium hover:bg-white hover:text-green-500 transition duration-300 hover:translate-y-1"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-white text-lg leading-relaxed">
                      Passionate about creating digital experiences that blend cutting-edge technology 
                      with intuitive design. Every feature in ShopSphere is crafted with attention to 
                      detail and user experience in mind.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-black mb-8">
            Ready to Experience ShopSphere?
          </h2>
          
          <p className="text-xl text-black mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the community of smart shoppers who choose quality, design, and innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => navigate('/')}
              className="group px-12 py-6 bg-green-500 text-white rounded-2xl font-black text-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl flex items-center gap-4"
            >
              Start Shopping Now
              <FaRocket className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;