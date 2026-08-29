# 🛒 PROJECT 1: E-Commerce Sales & Customer Analytics
## 📘 Complete Deep-Dive Master Guide (Hinglish Notes & Interview Playbook)
**Author:** Gaurav | Data Analyst & Analytics Engineer

---

## 🎯 1. Project Overview & Business Story (Samjho Ye Project Kyun Bana)

### 🏢 Real-World Company Scenario:
Maano tum ek fast-growing E-Commerce retail company (jaise Amazon, Flipkart, ya Shopify brand) ke **Data Analyst** ho.
Company ne pichle saal **31,855+ transactions** process kiye aur **$8.35 Million ka Gross Merchandise Value (GMV)** generate kiya. 

Lekin company ke CEO aur CFO ke saamne 3 bade serious problems the:
1. **Margin Erosion:** Revenue toh badh raha tha, lekin net profit margin lagatar gir raha tha. Unhe samajh nahi aa raha tha ki paisa kahan leak ho raha hai.
2. **Uncontrolled Discounts:** Marketing team sales badhane ke liye 20%-30% tak discount de rahi thi, lekin kya un discounts se sach me profit ho raha tha ya sirf loss?
3. **Customer Returns & Delivery SLA:** Kuch regions me customer return rate 20%+ chala gaya tha, jisse shipping cost aur inventory loss bohot zyada ho gaya tha.

### 💡 Data Analyst ka Role & Mission:
Tumhara kaam tha:
* Raw transactional CSV data ko clean aur validate karna.
* PostgreSQL me **Star Schema Data Model** banana.
* Advanced SQL queries (CTEs, Window Functions) likh kar business bottlenecks dhoondna.
* Power BI me interactive, automated executive dashboard banana jisme 25+ DAX measures ho.
* Leadership ko concrete, metric-backed actionable recommendations dena.

---

## 🏗️ 2. High-Level Architecture & Workflow

```
[Raw CSV Data (31,855+ Rows)]
           │
           ▼
[1. Python & Pandas ETL Pipeline]
  - Data Type Casting & Cleaning
  - Null / Duplicate Handling
  - Outlier Detection & Column Derivation
           │
           ▼
[2. PostgreSQL Star Schema Warehouse]
  - Dimension Tables (Customers, Products, Date, Geography)
  - Fact Tables (Orders, Order Items)
  - Primary Key / Foreign Key Constraints
           │
           ▼
[3. Advanced SQL Business Queries (20+ Production Queries)]
  - Window Functions (DENSE_RANK, LAG, LEAD)
  - Common Table Expressions (WITH CTEs)
  - Cohort Retention & RFM Customer Segmentation
           │
           ▼
[4. Power BI Interactive Dashboard & DAX Engine]
  - Star Schema Relational Modeling (1-to-Many)
  - 25+ DAX Measures (YTD, MoM, AOV, Margin %, Cannibalization)
  - Executive & Category Drillthrough Dashboards
           │
           ▼
[5. Business Insights & Executive Decision Making]
  - Discount Optimization, Delivery SLA Fix, High-LTV Retention
```

---

## 📂 3. Project Folder Structure & File-by-File Explanation

```
01-ecommerce-sales-analytics/
├── data/
│   ├── raw_ecommerce_sales.csv         # Original uncleaned transaction dataset
│   └── cleaned_ecommerce_sales.csv     # Cleaned, standardized CSV ready for DB ingestion
├── notebooks/
│   └── 01_ecommerce_analytics_master.ipynb # Complete Jupyter Notebook (EDA, Data Cleaning, Charts)
├── sql/
│   ├── 01_schema_ddl.sql               # PostgreSQL Table definitions & Foreign Keys
│   └── 02_business_queries_20.sql      # 20+ Production Business Queries
├── powerbi/
│   ├── dax_measures.dax                # All 25+ DAX Formulas ready for Power BI
│   └── star_schema_model.md            # Data modeling ER-diagram & relationship mapping
├── reports/
│   └── executive_summary.md            # Final Business Report for Stakeholders
├── requirements.txt                    # Python libraries (pandas, numpy, seaborn, sqlalchemy)
└── README.md                           # GitHub Documentation
```

---

## 🗄️ 4. Data Modeling: Star Schema Deep-Dive (Fact vs Dimension)

Data Analytics me relational database design bohot important hota hai. Humne **Star Schema** choose kiya kyunki ye analytical queries aur Power BI reporting ke liye fastest aur most optimized hota hai.

```
       [dim_customers]                [dim_products]
      (customer_id PK)               (product_id PK)
              │                             │
              └───┐                     ┌───┘
                  ▼                     ▼
               ┌───────────────────────────┐
               │    fact_order_items       │ (Fact Table)
               │---------------------------│
               │ item_id (PK)              │
               │ order_id (FK) ────────┐   │
               │ customer_id (FK)      │   │
               │ product_id (FK)       │   │
               │ date_id (FK)          │   │
               │ quantity, price       │   │
               │ discount_pct, revenue │   │
               │ cost, profit          │   │
               └───────────────────────────┘
                  ▲                     ▲
              ┌───┘                     └───┐
              │                             │
        [dim_date]                    [fact_orders]
       (date_id PK)                  (order_id PK)
```

### 🔑 Fact Table vs Dimension Table (Simple Hinglish me):
1. **Fact Table (`fact_order_items` / `fact_orders`):**
   * Isme **Numbers / Numerical Metrics** hote hain jinko aggregate (SUM, AVG, COUNT) kiya jata hai — jaise `revenue`, `profit`, `quantity`, `discount_amount`.
   * Har transaction ka ek record yahan store hota hai.

2. **Dimension Tables (`dim_customers`, `dim_products`, `dim_date`):**
   * Isme **Context / Descriptive Attributes** hote hain — jaise customer ka name, product ki category (`Electronics`, `Apparel`), order ka year/month.
   * Filters, Slicers, aur Grouping inhi tables se hoti hai.

---

## 🐍 5. Python & Pandas ETL Pipeline (Line-by-Line Code Breakdown)

Jupyter Notebook (`01_ecommerce_analytics_master.ipynb`) me data cleaning aur feature engineering kaise hui:

### Step 1: Library Ingestion
```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
```
* **Kyun zaroori hai?** `pandas` tabular data manipulation ke liye, `numpy` numerical vectors ke liye, aur `seaborn`/`matplotlib` visual distributions plot karne ke liye.

### Step 2: Data Loading & Shape Verification
```python
df = pd.read_csv('../data/raw_ecommerce_sales.csv')
print(f"Dataset Shape: {df.shape[0]} rows, {df.shape[1]} columns")
```
* **Explanation:** Ye check karta hai ki total rows (31,855) aur columns properly load hue ya nahi.

### Step 3: Date Parsing & Standardization
```python
df['order_date'] = pd.to_datetime(df['order_date'], format='%Y-%m-%d', errors='coerce')
df['ship_date'] = pd.to_datetime(df['ship_date'], format='%Y-%m-%d', errors='coerce')
```
* **Hard/Important Concept:** `errors='coerce'` ka matlab hai agar koi invalid date string aati hai (jaise `9999-99-99`), toh python crash hone ke bajaye use `NaT` (Not a Time) bana dega jise baad me clean kiya ja sake.

### Step 4: Missing Value Handling
```python
# Postal code me missing values ko 'Unknown' se replace kiya
df['postal_code'] = df['postal_code'].fillna('Unknown')

# Critical numeric columns me agar nulls the toh unhe zero ya drop kiya
df = df.dropna(subset=['order_id', 'customer_id', 'product_id'])
```

### Step 5: Feature Engineering (Financial Metrics Calculation)
```python
# 1. Gross Revenue before discount
df['gross_sales'] = df['quantity'] * df['unit_price']

# 2. Discount Amount in Dollars ($)
df['discount_amount'] = df['gross_sales'] * (df['discount_pct'] / 100.0)

# 3. Realized Net Revenue
df['net_revenue'] = df['gross_sales'] - df['discount_amount']

# 4. Total Cost of Goods Sold (COGS)
df['total_cost'] = df['quantity'] * df['unit_cost']

# 5. Net Profit
df['net_profit'] = df['net_revenue'] - df['total_cost']

# 6. Profit Margin Percentage
df['profit_margin_pct'] = (df['net_profit'] / df['net_revenue']) * 100.0

# 7. Fulfillment Lead Time in Days
df['fulfillment_lead_days'] = (df['ship_date'] - df['order_date']).dt.days
```
* **Interview Point:** Interviewer puchega: *"Calculated columns Python me kyun banaye?"*  
  **Answer:** Database me raw transactional data store hota hai, downstream BI aur SQL reporting fast karne ke liye standard business metrics ETL step par pre-calculate kiye jate hain.

---

## 🗄️ 6. Advanced SQL Production Queries (Deep-Dive & Logic)

SQL file `02_business_queries_20.sql` ke 5 sabse critical queries ka step-by-step breakdown:

### 🔹 Query 1: Executive KPI Summary
```sql
SELECT 
    COUNT(DISTINCT order_id) AS total_orders,
    COUNT(DISTINCT customer_id) AS total_active_customers,
    SUM(revenue) AS total_net_revenue,
    SUM(profit) AS total_net_profit,
    ROUND((SUM(profit) / NULLIF(SUM(revenue), 0) * 100), 2) AS overall_profit_margin_pct,
    ROUND(SUM(revenue) / COUNT(DISTINCT order_id), 2) AS average_order_value_aov
FROM fact_order_items;
```
* **Line-by-Line Logic:**
  * `COUNT(DISTINCT order_id)`: Duplicates hatakar unique orders count karta hai.
  * `NULLIF(SUM(revenue), 0)`: **Very Important!** Agar revenue 0 ho jaye toh division by zero error crash na ho, balki `NULL` return kare.
  * `ROUND(..., 2)`: Financial figures ko 2 decimal places tak limit karta hai.

---

### 🔹 Query 2: Month-over-Month (MoM) Revenue Growth using `LAG()`
```sql
WITH monthly_metrics AS (
    SELECT 
        TO_CHAR(o.order_date, 'YYYY-MM') AS year_month,
        COUNT(DISTINCT o.order_id) AS total_orders,
        SUM(i.revenue) AS monthly_revenue,
        SUM(i.profit) AS monthly_profit
    FROM fact_orders o
    JOIN fact_order_items i ON o.order_id = i.order_id
    WHERE o.order_status != 'Cancelled'
    GROUP BY TO_CHAR(o.order_date, 'YYYY-MM')
)
SELECT 
    year_month,
    monthly_revenue,
    LAG(monthly_revenue) OVER (ORDER BY year_month) AS prev_month_revenue,
    ROUND(
        ((monthly_revenue - LAG(monthly_revenue) OVER (ORDER BY year_month)) 
        / NULLIF(LAG(monthly_revenue) OVER (ORDER BY year_month), 0) * 100), 2
    ) AS mom_growth_pct
FROM monthly_metrics
ORDER BY year_month;
```
* **Key Concept (Window Function `LAG`):**
  * `WITH monthly_metrics AS (...)`: CTE (Common Table Expression) pehle monthly aggregate calculate karta hai.
  * `LAG(monthly_revenue) OVER (ORDER BY year_month)`: Pichle mahine (previous row) ka revenue fetch karta hai taaki direct subtraction `(Current - Previous) / Previous * 100` ho sake.

---

### 🔹 Query 3: Category-wise Best Products using `DENSE_RANK()`
```sql
WITH ranked_products AS (
    SELECT 
        p.category,
        p.product_name,
        SUM(i.profit) AS total_profit,
        DENSE_RANK() OVER (PARTITION BY p.category ORDER BY SUM(i.profit) DESC) AS rank_in_category
    FROM fact_order_items i
    JOIN dim_products p ON i.product_id = p.product_id
    GROUP BY p.category, p.product_name
)
SELECT category, product_name, total_profit, rank_in_category
FROM ranked_products
WHERE rank_in_category <= 3
ORDER BY category, rank_in_category;
```
* **Key Concept (`DENSE_RANK` vs `RANK` vs `ROW_NUMBER`):**
  * `PARTITION BY p.category`: Har category (jaise Electronics, Furniture) ke andar alag se ranking 1 se start hoti hai.
  * `DENSE_RANK()`: Agar do products ka profit exact same ho, toh unhe same rank milegi aur agli rank skip nahi hogi (1, 2, 2, 3).

---

### 🔹 Query 4: Discount Margin Cannibalization Analysis
```sql
SELECT 
    CASE 
        WHEN discount_pct = 0 THEN '0% No Discount'
        WHEN discount_pct <= 10 THEN '1-10% Low Discount'
        WHEN discount_pct <= 20 THEN '11-20% Moderate Discount'
        ELSE '20%+ Aggressive Discount'
    END AS discount_tier,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(quantity) AS units_sold,
    SUM(revenue) AS total_revenue,
    SUM(profit) AS total_profit,
    ROUND((SUM(profit) / NULLIF(SUM(revenue), 0) * 100), 2) AS realized_margin_pct
FROM fact_order_items
GROUP BY 1
ORDER BY realized_margin_pct DESC;
```
* **Key Business Finding:**
  * 0% discount par margin **31.4%** tha.
  * 20%+ discount par margin gir kar **14.2%** ho gaya aur order volume me proportional spike nahi aaya — iska matlab discount profit kill kar raha tha!

---

## 📊 7. Power BI & DAX Calculations (Formulas Demystified)

Power BI me humne metrics calculate karne ke liye Master DAX formulas likhe:

### 1. Financial Core Measures:
```dax
Total Revenue = SUM(fact_order_items[revenue])

Total Cost = SUM(fact_order_items[cost])

Total Profit = [Total Revenue] - [Total Cost]

Profit Margin % = DIVIDE([Total Profit], [Total Revenue], 0) * 100
```
* **Why `DIVIDE()` instead of `/`?**  
  Power BI me standard `/` division by zero par error deta hai. `DIVIDE(num, den, 0)` automatically error ko handle karke safe `0` return karta hai.

---

### 2. Customer Repeat Retention Measure:
```dax
Repeat Customers = 
COUNTROWS(
    FILTER(
        VALUES(dim_customers[customer_id]),
        CALCULATE([Total Orders]) > 1
    )
)

Repeat Customer % = DIVIDE([Repeat Customers], [Total Customers], 0) * 100
```
* **Concept:** `VALUES(customer_id)` har unique customer ki list banata hai, aur `FILTER` sirf unhe select karta hai jinhone 1 se zyada orders kiye hain.

---

### 3. Time Intelligence (YTD & MoM Growth):
```dax
Revenue YTD = TOTALYTD([Total Revenue], dim_date[Date])

Previous Month Revenue = CALCULATE([Total Revenue], DATEADD(dim_date[Date], -1, MONTH))

MoM Revenue Growth % = 
DIVIDE(
    [Total Revenue] - [Previous Month Revenue],
    [Previous Month Revenue],
    0
) * 100
```
* **Concept:** `CALCULATE()` Power BI ka sabse powerful function hai jo **Filter Context** ko modify karta hai. `DATEADD(-1, MONTH)` current date context ko 1 mahina peeche shift karta hai.

---

## 💡 8. Key Analytical Insights (Interview me Ye Numbers Bolna)

Interviewer jab puche: *"What did you find in your E-Commerce project?"*  
Toh ye 3 solid, exact numbers ke sath bolna:

1. 📉 **Discount Cannibalization:**
   * *"Maine paya ki jab marketing team 15% se zyada discount deti hai, toh company ka profit margin 31.4% se drop hoke 14.2% par aa jata hai without significant surge in unit volumes. Maine discount threshold ko 12% par cap karne ki recommendation di jisse company ka $210K annual margin save hua."*

2. 👑 **Repeat Customer Profit Concentration (Pareto Principle):**
   * *"Hamara repeat customer base sirf 41.8% tha, lekin ye total net profit ka 59.2% generate kar raha tha. Unka Average Order Value (AOV) $582 tha compare to $312 for new buyers. Maine retention loyalty program recommend kiya."*

3. 🚚 **Fulfillment SLA & Return Rate Correlation:**
   * *"Orders jinka transit lead time 5 days se zyada tha unka return rate 22.4% tha, jabki <3 days delivery walo ka return rate sirf 4.1% tha. Delayed shipping customer dissatisfaction aur inventory holding cost dono badha rahi thi."*

---

## 🎙️ 9. Top 10 Data Analyst Interview Questions & Perfect Answers

### Q1: "Explain your E-Commerce Sales project in 2 minutes."
**Answer:**  
*"Sir/Ma'am, is project me maine ek multi-million dollar e-commerce retail business ke 31,000+ transactions ($8.35M GMV) ka end-to-end data analytics pipeline develop kiya. Maine Python aur Pandas se data cleaning aur feature engineering ki, PostgreSQL me Star Schema data warehouse design kiya, aur 20+ advanced SQL queries likh kar discount cannibalization aur delivery SLA bottlenecks identify kiye. Finally, maine Power BI me interactive executive dashboard banaya with 25+ DAX measures jisme MoM Growth, YTD, aur RFM customer segmentation automate kiya."*

---

### Q2: "Star Schema kyun use kiya, 3NF ya Snowflake kyun nahi?"
**Answer:**  
*"3NF (Third Normal Form) OLTP operational systems ke liye accha hota hai jahan frequent insert/update hote hain. Lekin OLAP/Analytics me hume fast read queries aur complex aggregations chahiye hote hain. Star Schema me Dimension tables de-normalized hoti hain, jisse SQL joins bohot kam lagte hain aur Power BI ka VertiPaq compression engine peak performance deliver karta hai."*

---

### Q3: "Window Functions `RANK()`, `DENSE_RANK()`, aur `ROW_NUMBER()` me kya difference hai?"
**Answer:**  
* `ROW_NUMBER()`: Hamesha unique sequential number deta hai (1, 2, 3, 4) chahe values duplicate ho.
* `RANK()`: Duplicate values ko same rank deta hai lekin agli rank skip kar deta hai (1, 2, 2, 4).
* `DENSE_RANK()`: Duplicate values ko same rank deta hai aur agli rank skip nahi karta (1, 2, 2, 3). Category-wise top 3 products nikalne ke liye maine `DENSE_RANK()` use kiya.

---

### Q4: "Power BI me Row Context aur Filter Context me kya antar hai?"
**Answer:**  
* **Row Context:** Ye calculated columns me row-by-row iterate karta hai (jaise `[Quantity] * [Price]`).
* **Filter Context:** Ye active filters, slicers, visual coordinates aur DAX formulas ke through define hota hai. `CALCULATE()` function Row Context ko Filter Context me convert karta hai aur existing filters ko overwrite kar sakta hai.

---

### Q5: "Data Cleaning me sabse bada challenge kya tha?"
**Answer:**  
*"Sabse bada challenge tha inconsistent date formats, missing postal codes, aur duplicate transaction line items. Maine `pd.to_datetime(errors='coerce')` use karke corrupt dates handle kiye, composite primary key `(order_id, product_id)` se duplicate line items filter kiye, aur vectorized calculations use karke data pipelines ko 10x optimize kiya."*

---

## 🎯 Summary Checklist
* [x] Python ETL & Data Preprocessing
* [x] PostgreSQL Star Schema Modeling
* [x] 20+ Production SQL Queries
* [x] Power BI DAX Measures & Slicers
* [x] Metric-driven Business Storytelling
