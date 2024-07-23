import { certification } from "@/types/main";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import SectionWrapper from "../SectionWrapper";
import CertificationCard from "./CertificationCard";

interface Props {
    certificationsData: certification[]
}

const Certifications = ({ certificationsData }: Props) => {

    const [certifications, setCertifications] = useState([...certificationsData].reverse() as certification[])

    // const categories = ['All', ...Array.from(new Set(projects.map((s) => s.category)))]
    const categories = [...Array.from(new Set(certifications.map((s) => s.category)))]

    // const [category, setCategory] = useState(categories[0] || "All")
    const [category, setCategory] = useState(categories[0])

    const [filteredCertifications, setFilteredCertifications] = useState(certifications as certification[])
    const [viewAll, setViewAll] = useState(false)

    const filterCertifications = (cat: string) => {
        setViewAll(false)
        setCategory(cat)
        // cat === "All" ? setFilteredProjects(projects) :
        setFilteredCertifications(certifications.filter((p: certification) => p.category.toLowerCase() === cat.toLowerCase()));
    }

    useEffect(() => {
        filterCertifications(categories.includes('MERN Stack') ? "MERN Stack" : categories[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SectionWrapper id="certifications" className="mx-4 md:mx-0 min-h-screen">
            <h2 className="text-4xl text-center">Certifications</h2>

            <div className="overflow-x-auto scroll-hide md:w-full max-w-screen-sm mx-auto mt-6 flex justify-between items-center gap-2 md:gap-3 bg-white dark:bg-grey-800 p-2 rounded-md">
                {categories.map((c: string = "", i: number) => (
                    <span key={i} onClick={() => filterCertifications(c)} className={`p-1.5 md:p-2 w-full text-sm md:text-base text-center capitalize rounded-md ${category.toLowerCase() === c.toLowerCase() ? "bg-violet-600 text-white" : "hover:bg-gray-100 hover:dark:bg-grey-900"} cursor-pointer transition-all`}>
                        {c}
                    </span>
                ))}
            </div>

            <div className="md:mx-6 lg:mx-auto lg:w-5/6 2xl:w-3/4 my-4 md:my-8 mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
                {filteredCertifications.slice(0, viewAll ? filteredCertifications.length : 6).map((p: certification, i: number) => (
                    <CertificationCard key={i} {...p} />
                ))}
            </div>


            {filteredCertifications.length > 6
                &&
                <ViewAll scrollTo='projects' title={viewAll ? 'Okay, I got it' : 'View All'} handleClick={() => setViewAll(!viewAll)} />
            }
        </SectionWrapper>
    )
}

export default Certifications

type MouseEventHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

export const ViewAll = ({ handleClick, title, scrollTo }: { handleClick: MouseEventHandler, title: string, scrollTo: string }) => {
    return (
        <>
            <div className="bg-white dark:bg-grey-900 w-4/5 mx-auto blur-xl z-20 -translate-y-14 h-16"></div>
            <div className="text-center -translate-y-24">
                {title === 'View All' ?
                    <button onClick={handleClick} className={`bg-violet-600 text-white px-4 ${title === 'View All' ? 'animate-bounce' : 'animate-none'} py-1.5 rounded-md hover:shadow-xl transition-all`}>
                        {title}
                    </button>
                    :
                    <Link
                        to={scrollTo}
                        className={`bg-violet-600 text-white px-4 ${title === 'View All' ? 'animate-bounce' : 'animate-none'} cursor-pointer py-1.5 rounded-md hover:shadow-xl transition-all`}
                        offset={-60}
                        smooth={true}
                        duration={500}
                        // @ts-ignore
                        onClick={() => handleClick()}
                    >{title}</Link>
                }
            </div>
        </>
    )
}
