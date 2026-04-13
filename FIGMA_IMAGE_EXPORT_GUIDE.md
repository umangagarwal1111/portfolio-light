# MagicPin Case Study — Image Export Guide

Your portfolio case study page is **ready with placeholders** for 7 key images. Once you export and share these images, I'll integrate them into the website.

## Images to Export from Figma

The Figma file is: `eOlrNDmrH4DhyApKv9f3mD`
The case study node is: `38-1722`

Export these **7 images** from the Figma design:

| # | Figma Node ID | Image Purpose | Filename | Size |
|---|---|---|---|---|
| 1 | `47:1263` | Problem 01 - "No Relevancy" app screenshot | `problem1.jpg` | ~300×250px |
| 2 | `47:4485` | Problem 02 - "No Defined Journey" app screenshot | `problem2.jpg` | ~300×250px |
| 3 | `47:5287` | Problem 03 - "Brand & Product Perception" app screenshot | `problem3.jpg` | ~300×250px |
| 4 | `47:6088` | Problem 04 - "Inconsistent Experience" app screenshot | `problem4.jpg` | ~300×250px |
| 5 | `47:6888` | HMW Statement - "Defining the problem" quote visual | `hmw.jpg` | ~500×300px |
| 6 | `48:6957` | Impact/Metrics - full metrics section with phone mockups | `impact.jpg` | ~600×2000px |
| 7 | `82:2537` | Final Designs - 4 phone mockups (Shop, Magic9, Deals, Merchant) | `final-designs.jpg` | ~1000×500px |

## How to Export from Figma

For each image:
1. **Select the component/frame** in the Figma canvas (use node ID to find it)
2. **Right-click → Export** (or use top menu: File → Export)
3. **Settings:**
   - Format: **JPG**
   - Scale: **1x** (for quality/size balance)
4. **Save with the filename** from the table above

## Where to Put the Images

After exporting, place all 7 images in this folder on your computer:

```
portfolio/
└── public/
    └── case-studies/
        └── magicpin/
            ├── problem1.jpg
            ├── problem2.jpg
            ├── problem3.jpg
            ├── problem4.jpg
            ├── hmw.jpg
            ├── impact.jpg
            └── final-designs.jpg
```

## After You Share the Images

Once you have the 7 images ready, you can either:

**Option A:** Share them with me directly (upload or describe where they are)
I'll place them in the project folder and update the component references.

**Option B:** Place them in the project folder yourself
Then I'll update the image URL references in the component.

## Current Status

- ✅ Case study page is **fully built and working**
- ✅ All text content is in place (problems, metrics, learnings, etc.)
- ✅ Placeholder boxes are visible where images should go
- ⏳ **Waiting for:** 7 exported Figma images
- 🔄 **Next step:** Update image URLs in the component

Once the images are ready, the integration will take just minutes!

---

**Component File:** `src/app/pages/MagicPinCaseStudy.tsx`
**Image References Object:** Lines 199–207 (IMG object)
**Local URL Path:** `/case-studies/magicpin/` (relative to `public/` folder)
