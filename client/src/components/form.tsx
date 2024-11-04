import { ChangeEvent } from "react"
import { FileUpload, Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface form {
  parentName: string;
  email: string;
  password: string;
  childName: string;
  school: string;
  class: string;
  section: string;
  society: string;
  idCardImage: File | null;
}

interface Formprops {
  formData: form;
  setFormData: React.Dispatch<React.SetStateAction<form>>;
  currentStep: number;
}


export default function Form({ formData, setFormData, currentStep }: Formprops) {

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files[0])
    if (e.target) {
      setFormData(prev => ({ ...prev, idCardImage: e.target.files[0] }))
    }
  }


  return (
    <>
      {currentStep === 1 &&
        <div className="space-y-4">
          <div>
            <Label htmlFor="parentName">Parent Name*</Label>
            <Input
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="childName">Child's Name*</Label>
            <Input
              id="childName"
              name="childName"
              value={formData.childName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password*</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      }
      {
        currentStep === 2 && (
          <div className="space-y-4">

            <div>
              <Label htmlFor="school">School*</Label>
              <Input
                id="school"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="class">Class*</Label>
              <Input
                id="class"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="section">Section*</Label>
              <Input
                id="section"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="childName">Society / Address (optional)</Label>
              <Input
                id="society"
                name="society"
                value={formData.society}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )
      }
      {
        currentStep === 3 && (
          <FileUpload handleFileChange={handleFileChange} />
        )
      }
    </>
  )
}

