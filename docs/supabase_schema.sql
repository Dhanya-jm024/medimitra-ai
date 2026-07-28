-- ====================================================================
-- MediMitra AI — Production Supabase PostgreSQL Schema
-- Run this script in your Supabase Dashboard -> SQL Editor
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Users Profile Table (Links to Supabase Auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone_number TEXT,
    age INT,
    blood_group VARCHAR(5),
    preferred_language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Symptoms History Triage Table
CREATE TABLE IF NOT EXISTS public.symptoms_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    symptoms_text TEXT NOT NULL,
    language VARCHAR(10) DEFAULT 'en',
    condition_name TEXT NOT NULL,
    confidence_percentage INT NOT NULL,
    risk_level VARCHAR(20) NOT NULL, -- LOW, MODERATE, HIGH, CRITICAL
    summary TEXT NOT NULL,
    recommended_actions JSONB DEFAULT '[]'::jsonb,
    home_remedies JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Medical Health Records Table
CREATE TABLE IF NOT EXISTS public.health_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    record_type VARCHAR(50) NOT NULL, -- AI Triage, Pill Scan, Doctor Prescription, Lab Report
    file_url TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Medications Reminders Table
CREATE TABLE IF NOT EXISTS public.medications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    medicine_name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL,
    scheduled_time TIME NOT NULL,
    is_taken_today BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create Emergency Contacts Table
CREATE TABLE IF NOT EXISTS public.emergency_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    contact_name TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    relationship TEXT,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Row Level Security (RLS) Policies for Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptoms_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;

-- Allow Users to Read and Update Only Their Own Profile & Data
CREATE POLICY "Users can access own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can access own symptoms history" ON public.symptoms_history FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own health records" ON public.health_records FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own medications" ON public.medications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own emergency contacts" ON public.emergency_contacts FOR ALL USING (auth.uid() = user_id);
