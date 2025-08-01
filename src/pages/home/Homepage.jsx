import Banner from "../../components/banner/banner"
import CompanyMilestones from "../../components/companyMilestones/CompanyMilestones"
import Faq from "../../components/faq/Faq"

import Services from "../../components/services/Services"
import Testimonial from "../../components/testimonial/Testimonial"


const Homepage = () => {
  return (
    <div>
      <Banner />
      <Services />
      <Testimonial />
      <CompanyMilestones />
      <Faq/>
    </div>

  )
}

export default Homepage