// Utility functions for managing access codes
import { supabase } from './supabaseClient';

// Generate random 8-character code
export const generateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Mock validation for development (if Supabase not configured)
const mockValidateCodes = {
  team: ['TEAM001', 'TEAM002', 'TEAM003', 'TEAM004', 'TEAM005'],
  coach: ['COACH001', 'COACH002', 'COACH003'],
  company: ['COMPANY001', 'COMPANY002']
};

// Validate team code
export const validateTeamCode = async (code) => {
  if (!supabase) {
    // Mock validation for development
    return mockValidateCodes.team.includes(code);
  }
  
  try {
    const { data, error } = await supabase
      .from('team_codes')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .single();
    
    if (error) return false;
    return !!data;
  } catch (err) {
    return false;
  }
};

// Validate coach code
export const validateCoachCode = async (code) => {
  if (!supabase) {
    // Mock validation for development
    return mockValidateCodes.coach.includes(code);
  }
  
  try {
    const { data, error } = await supabase
      .from('coach_codes')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .single();
    
    if (error) return false;
    return !!data;
  } catch (err) {
    return false;
  }
};

// Validate company code
export const validateCompanyCode = async (code) => {
  if (!supabase) {
    // Mock validation for development
    return mockValidateCodes.company.includes(code);
  }
  
  try {
    const { data, error } = await supabase
      .from('company_codes')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .single();
    
    if (error) return false;
    return !!data;
  } catch (err) {
    return false;
  }
};

// Seed initial codes (call once on first run)
export const seedCodes = async () => {
  if (!supabase) {
    console.warn('Supabase not configured. Skipping seed.');
    return false;
  }
  
  const teamCodes = [];
  const coachCodes = [];
  const companyCodes = [];

  // Generate 25 team codes
  for (let i = 0; i < 25; i++) {
    teamCodes.push({ code: generateCode(), is_active: true });
  }

  // Generate 10 coach codes
  for (let i = 0; i < 10; i++) {
    coachCodes.push({ code: generateCode(), is_active: true });
  }

  // Generate 5 company codes
  for (let i = 0; i < 5; i++) {
    companyCodes.push({ code: generateCode(), is_active: true });
  }

  // Insert into Supabase
  try {
    await supabase.from('team_codes').insert(teamCodes);
    await supabase.from('coach_codes').insert(coachCodes);
    await supabase.from('company_codes').insert(companyCodes);
    
    console.log('Codes seeded successfully!');
    return true;
  } catch (error) {
    console.error('Error seeding codes:', error);
    return false;
  }
};

// Generate and save new team code
export const generateTeamCode = async () => {
  const code = generateCode();
  
  if (!supabase) {
    console.warn('Supabase not configured. Returning mock code.');
    return code;
  }
  
  try {
    const { data, error } = await supabase
      .from('team_codes')
      .insert([{ code, is_active: true }])
      .select()
      .single();
    
    if (error) throw error;
    return code;
  } catch (error) {
    console.error('Error generating team code:', error);
    return null;
  }
};
