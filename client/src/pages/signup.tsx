import { useState, FormEvent } from 'react'
import { ArrowRight, ArrowLeft, } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Form from '@/components/form'

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    password: '',
    childName: '',
    school: '',
    class: '',
    section: '',
    society: '',
    idCardImage: null
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3))
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }



  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
            <div className="relative mb-8">
              <div className="flex justify-between mb-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`z-10 w-8 h-8 flex items-center justify-center rounded-full ${currentStep >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-black dark:bg-gray-800 dark:text-white'
                      }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
              <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                  style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                ></div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>

              <Form
                formData={formData}
                setFormData={setFormData}
                currentStep={currentStep}
              />

              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <Button type="button" onClick={handlePrevStep} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                )}
                {currentStep < 3 ? (
                  <Button type="button" onClick={handleNextStep} className="ml-auto">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto bg-blue-600 hover:bg-blue-700 text-white">
                    Complete Signup
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
