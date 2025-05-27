import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector'
import { categories } from '../services/apis'
import { getCatalogaPageData } from '../services/operations/pageAndComponentData'
import Course_Card from '../components/core/Catalog/Course_Card'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import { useSelector } from 'react-redux'
import Error from './Error'

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState('')

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector('GET', categories.CATEGORIES_API)
        const tags = res?.data?.allTags || []
        const match = tags.find(t => t.name === catalogName)
        if (match?._id) setCategoryId(match._id)
      } catch (e) {
        console.error(e)
      }
    }
    getCategories()
  }, [catalogName])

  useEffect(() => {
    if (!categoryId) return
    getCatalogaPageData(categoryId)
      .then(res => setCatalogPageData(res))
      .catch(err => console.error(err))
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!catalogPageData.success) return <Error />

  const {
    selectedCategory,
    differentCategory = [],
    mostSellingCourses = [],
  } = catalogPageData.data

  const starterCourses = selectedCategory.course || []

  return (
    <>
      <div className="bg-richblack-800 px-4 text-white">
        <div className="mx-auto flex min-h-[260px] max-w-[1320px] flex-col justify-center gap-4 pt-6 sm:pt-10">
          <p className="text-sm text-richblack-300">
            Home / Catalog /{' '}
            <span className="text-yellow-25">{selectedCategory.name}</span>
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-richblack-5">
            {selectedCategory.name}
          </h1>
          <p className="text-sm sm:text-base text-richblack-200 max-w-4xl">
            {selectedCategory.description}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-4 py-10">
        <h2 className="section_heading text-white">Courses to get you started</h2>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm sm:text-base">
          {['Most Popular', 'New'].map((label, idx) => (
            <button
              key={label}
              className={`px-4 py-2 transition-all duration-200 ${active === idx + 1
                  ? 'border-b-2 border-yellow-25 text-yellow-25'
                  : 'text-richblack-50'
                }`}
              onClick={() => setActive(idx + 1)}
            >
              {label}
            </button>
          ))}
        </div>
        <CourseSlider Courses={starterCourses} />
      </div>

      {differentCategory.map(cat => {
        const courses = cat.course || []
        return (
          <div
            key={cat._id}
            className="mx-auto w-full max-w-[1320px] px-4 py-10"
          >
            <h2 className="section_heading text-white">
              Top courses in {cat.name}
            </h2>
            <div className="pt-6">
              <CourseSlider Courses={courses} />
            </div>
          </div>
        )
      })}

      <div className="mx-auto w-full max-w-[1320px] px-4 py-10">
        <h2 className="section_heading text-white">Frequently Bought</h2>
        <div className="pt-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {mostSellingCourses.flatMap(cat => cat.course || [])
              .slice(0, 4)
              .map((course, i) => (
                <Course_Card key={i} course={course} Height="h-[250px] sm:h-[300px] lg:h-[400px]" />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Catalog
