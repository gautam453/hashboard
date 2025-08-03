import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://opmvbytnjhmnuulhqeji.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbXZieXRuamhtbnV1bGhxZWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxOTEwNjMsImV4cCI6MjA2OTc2NzA2M30.YCUS8OTc7g7SnQBT7Q1vUt_T_QX8xNzh9tGBAYnFAOw'

export const supabase = createClient(supabaseUrl, supabaseKey)