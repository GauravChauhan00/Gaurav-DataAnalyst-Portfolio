from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class InquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: Optional[str] = Field(default="Portfolio Inquiry", max_length=200)
    message: str = Field(..., min_length=5, max_length=5000)

class InquiryResponse(BaseModel):
    success: bool
    message: str
    inquiry_id: Optional[int] = None

class VisitCreate(BaseModel):
    path: Optional[str] = "/"
    referrer: Optional[str] = "Direct / Bookmark"
    screen: Optional[str] = "Unknown"
    deviceType: Optional[str] = "Desktop"
    language: Optional[str] = "en"
    timezone: Optional[str] = "Unknown"
    siteName: Optional[str] = "Data Analyst Portfolio"

class StandardResponse(BaseModel):
    success: bool
    message: str
