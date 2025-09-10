






// import supabase from './lib/supabaseClient';
// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Camera, MapPin, Send, AlertCircle, CheckCircle, Clock, Filter,
//   Settings, BarChart3, Users, Zap, Home, User, Search, Bell, Eye,
//   Trash2, Lightbulb, Construction, Trees, Phone, Mail, Shield,
//   LogIn, UserPlus, Lock, ArrowRight, LogOut, MapPinned, MessageCircle,
//   ThumbsUp, Calendar, UserCog, FileText, ChevronDown, X, Menu,
//   Map, List, Info, Heart, HelpCircle, Award, ThumbsDown
// } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// const CivicReportingSystem = () => {
//   const [currentView, setCurrentView] = useState('login');
//   const [issues, setIssues] = useState([]);
//   const [selectedIssue, setSelectedIssue] = useState(null);
//   const [showReportForm, setShowReportForm] = useState(false);
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [userInfo, setUserInfo] = useState(null);
//   const [loginForm, setLoginForm] = useState({ email: '', password: '' });
//   const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
//   const [searchQuery, setSearchQuery] = useState('');
//   const fileInputRef = useRef(null);

//   const analyticsData = {
//     trends: [
//       { month: 'Jan', reports: 45, resolved: 42 },
//       { month: 'Feb', reports: 52, resolved: 48 },
//       { month: 'Mar', reports: 48, resolved: 45 },
//       { month: 'Apr', reports: 61, resolved: 55 },
//       { month: 'May', reports: 55, resolved: 52 },
//       { month: 'Jun', reports: 67, resolved: 58 }
//     ],
//     categories: [
//       { name: 'Potholes', value: 35, color: '#ef4444' },
//       { name: 'Streetlights', value: 28, color: '#f59e0b' },
//       { name: 'Garbage', value: 22, color: '#10b981' },
//       { name: 'Water', value: 15, color: '#3b82f6' }
//     ]
//   };

//   const issueCategories = [
//     { 
//       id: 'pothole', 
//       name: 'Pothole', 
//       icon: Construction, 
//       color: 'bg-red-500', 
//       department: 'PWD - Roads Division', 
//       contact: '+91-651-2446688',
//       email: 'pwd.roads@jharkhand.gov.in'
//     },
//     { 
//       id: 'streetlight', 
//       name: 'Streetlight', 
//       icon: Lightbulb, 
//       color: 'bg-yellow-500', 
//       department: 'JUSNL (Jharkhand Urban Services)', 
//       contact: '+91-651-2491234',
//       email: 'streetlight@jusnl.jharkhand.gov.in'
//     },
//     { 
//       id: 'garbage', 
//       name: 'Garbage', 
//       icon: Trash2, 
//       color: 'bg-green-500', 
//       department: 'Urban Development Dept.', 
//       contact: '+91-651-2480456',
//       email: 'sanitation@urban.jharkhand.gov.in'
//     },
//     { 
//       id: 'water', 
//       name: 'Water Issue', 
//       icon: AlertCircle, 
//       color: 'bg-blue-500', 
//       department: 'PHED (Public Health Engineering)', 
//       contact: '+91-651-2491567',
//       email: 'water@phed.jharkhand.gov.in'
//     },
//     { 
//       id: 'tree', 
//       name: 'Tree/Park', 
//       icon: Trees, 
//       color: 'bg-emerald-500', 
//       department: 'Forest & Environment Dept.', 
//       contact: '+91-651-2446789',
//       email: 'parks@forest.jharkhand.gov.in'
//     },
//     { 
//       id: 'other', 
//       name: 'Other', 
//       icon: AlertCircle, 
//       color: 'bg-gray-500', 
//       department: 'Municipal Corporation', 
//       contact: '+91-651-2446123',
//       email: 'grievance@ranchi.municipal.gov.in'
//     }
//   ];

//   const governmentDepartments = [
//     {
//       name: 'Public Works Department (PWD)',
//       head: 'Shri Rajesh Kumar Singh, Chief Engineer',
//       responsibilities: 'Road construction, maintenance, bridges, government buildings',
//       performance: { resolved: 156, pending: 23, avgTime: '4.2 days' },
//       contact: 'pwd.jharkhand@gov.in',
//       phone: '+91-651-2446688',
//       rating: 4.6
//     },
//     {
//       name: 'Jharkhand Urban Services (JUSNL)',
//       head: 'Smt. Priya Sharma, Managing Director',
//       responsibilities: 'Street lighting, urban infrastructure, electricity distribution',
//       performance: { resolved: 89, pending: 12, avgTime: '2.8 days' },
//       contact: 'md.jusnl@jharkhand.gov.in',
//       phone: '+91-651-2491234',
//       rating: 4.8
//     },
//     {
//       name: 'Urban Development Department',
//       head: 'Shri Anil Kumar Pandey, Secretary',
//       responsibilities: 'Waste management, urban planning, sanitation',
//       performance: { resolved: 134, pending: 18, avgTime: '3.5 days' },
//       contact: 'secy.urban@jharkhand.gov.in',
//       phone: '+91-651-2480456',
//       rating: 4.4
//     },
//     {
//       name: 'Public Health Engineering Dept.',
//       head: 'Dr. Sunita Devi, Chief Engineer',
//       responsibilities: 'Water supply, drainage, sewerage systems',
//       performance: { resolved: 67, pending: 8, avgTime: '5.1 days' },
//       contact: 'ce.phed@jharkhand.gov.in',
//       phone: '+91-651-2491567',
//       rating: 4.2
//     }
//   ];

//   const [reportForm, setReportForm] = useState({
//     category: '',
//     description: '',
//     priority: 'medium',
//     photo: null,
//     location: ''
//   });

//   // Check for existing session
//   useEffect(() => {
//     // Check if user is already logged in
//     const checkUser = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
      
//       if (session) {
//         // User is logged in, get profile data
//         const { data } = await supabase
//           .from('profiles')
//           .select('*')
//           .eq('id', session.user.id)
//           .single();
        
//         if (data) {
//           setUserInfo({
//             id: session.user.id,
//             name: data.name,
//             email: session.user.email,
//             phone: data.phone,
//             role: data.role,
//             address: data.address,
//             joinedOn: new Date(data.created_at || session.user.created_at).toISOString().split('T')[0]
//           });
          
//           setCurrentView(data.role === 'admin' ? 'admin' : 'citizen');
//         }
//       }
//     };
    
//     checkUser();
//   }, []);

//   // Geolocation and fetch issues/notifications
//   useEffect(() => {
//     // Get geolocation
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setReportForm(prev => ({
//           ...prev,
//           location: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
//         }));
//       });
//     }
    
//     // Fetch issues from Supabase
//     const fetchIssues = async () => {
//       try {
//         let { data, error } = await supabase
//           .from('issues')
//           .select(`
//             *,
//             profiles:user_id (name),
//             departments:department_id (name, phone, email)
//           `)
//           .order('created_at', { ascending: false });
        
//         if (error) throw error;
        
//         if (data && data.length > 0) {
//           // Transform data to match component structure
//           const transformedIssues = data.map(issue => ({
//             id: issue.id,
//             category: issue.category,
//             description: issue.description,
//             priority: issue.priority || 'medium',
//             location: issue.location,
//             photo: issue.photo_url,
//             status: issue.status,
//             createdAt: issue.created_at,
//             updatedAt: issue.updated_at,
//             assignedTo: issue.departments?.name || getDepartmentForCategory(issue.category)?.department || 'Municipal Corporation',
//             assignedContact: issue.departments?.phone || getDepartmentForCategory(issue.category)?.contact || '+91-651-2446123',
//             assignedEmail: issue.departments?.email || getDepartmentForCategory(issue.category)?.email || 'grievance@municipal.gov.in',
//             votes: issue.votes || 0,
//             comments: issue.comments || 0,
//             reporter: issue.profiles?.name || 'Anonymous'
//           }));
          
//           setIssues(transformedIssues);
//         } else {
//           // If no issues in database, use sample data
//           const sampleIssues = generateSampleIssues();
//           setIssues(sampleIssues);
          
//           // Optionally seed the database with sample issues
//           // for (const issue of sampleIssues) {
//           //   await supabase.from('issues').insert([{
//           //     category: issue.category,
//           //     description: issue.description,
//           //     priority: issue.priority,
//           //     location: issue.location,
//           //     status: issue.status,
//           //     created_at: issue.createdAt,
//           //     updated_at: issue.updatedAt
//           //   }]);
//           // }
//         }
//       } catch (error) {
//         console.error('Error fetching issues:', error);
//         // Fallback to sample data
//         const sampleIssues = generateSampleIssues();
//         setIssues(sampleIssues);
//       }
//     };
    
//     fetchIssues();
    
//     // Set up real-time subscription for issues
//     const issuesSubscription = supabase
//       .channel('public:issues')
//       .on('postgres_changes', { event: '*', schema: 'public', table: 'issues' }, payload => {
//         fetchIssues();
//       })
//       .subscribe();
      
//     return () => {
//       supabase.removeChannel(issuesSubscription);
//     };
//   }, []);

//   // Fetch notifications
//   useEffect(() => {
//     if (!userInfo?.id) return;

//     const fetchNotifications = async () => {
//       try {
//         const { data, error } = await supabase
//           .from('notifications')
//           .select('*')
//           .eq('user_id', userInfo.id)
//           .order('created_at', { ascending: false });
        
//         if (error) throw error;
        
//         if (data && data.length > 0) {
//           setNotifications(data);
//         } else {
//           // Fallback to sample notifications
//           const sampleNotifications = generateSampleNotifications();
//           setNotifications(sampleNotifications);
//         }
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//         // Fallback to sample data
//         const sampleNotifications = generateSampleNotifications();
//         setNotifications(sampleNotifications);
//       }
//     };
    
//     fetchNotifications();
    
//     // Set up real-time subscription for notifications
//     const notificationSubscription = supabase
//       .channel('public:notifications')
//       .on('postgres_changes', 
//         { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userInfo.id}` }, 
//         payload => {
//           setNotifications(prev => [payload.new, ...prev]);
//         }
//       )
//       .subscribe();
      
//     return () => {
//       supabase.removeChannel(notificationSubscription);
//     };
//   }, [userInfo?.id]);

//   const generateSampleIssues = () => {
//     const statuses = ['new', 'in-progress', 'resolved'];
//     const priorities = ['low', 'medium', 'high'];
//     const locations = [
//       '23.354085, 85.309562', // Ranchi
//       '23.367491, 85.325428',
//       '23.381256, 85.343323',
//       '23.361893, 85.297564',
//       '23.342678, 85.316753'
//     ];
    
//     const descriptions = [
//       'Deep pothole causing traffic issues',
//       'Street light not working for past 3 weeks',
//       'Garbage pile overflowing near market',
//       'Water pipeline leakage',
//       'Fallen tree blocking the road',
//       'Drainage blockage causing waterlogging',
//       'Public toilet needs maintenance',
//       'Broken park bench needs repair',
//       'Illegal construction blocking footpath',
//       'Stray dogs creating nuisance'
//     ];
    
//     return Array.from({ length: 15 }, (_, i) => {
//       const categoryId = issueCategories[Math.floor(Math.random() * issueCategories.length)].id;
//       const category = issueCategories.find(cat => cat.id === categoryId);
//       const status = statuses[Math.floor(Math.random() * statuses.length)];
//       const daysAgo = Math.floor(Math.random() * 30);
//       const createdDate = new Date();
//       createdDate.setDate(createdDate.getDate() - daysAgo);
      
//       const updatedDate = new Date(createdDate);
//       if (status !== 'new') {
//         updatedDate.setDate(updatedDate.getDate() + Math.floor(Math.random() * 5) + 1);
//       }
      
//       return {
//         id: Date.now() - i * 1000,
//         category: categoryId,
//         description: descriptions[Math.floor(Math.random() * descriptions.length)],
//         priority: priorities[Math.floor(Math.random() * priorities.length)],
//         location: locations[Math.floor(Math.random() * locations.length)],
//         photo: null,
//         status,
//         createdAt: createdDate.toISOString(),
//         updatedAt: updatedDate.toISOString(),
//         assignedTo: category?.department || 'Municipal Corporation',
//         assignedContact: category?.contact || '+91-651-2446123',
//         assignedEmail: category?.email || 'grievance@municipal.gov.in',
//         votes: Math.floor(Math.random() * 20),
//         comments: Math.floor(Math.random() * 5),
//         reporter: 'citizen'
//       };
//     });
//   };

//   const generateSampleNotifications = () => {
//     return [
//       {
//         id: 1,
//         type: 'status_update',
//         message: 'Your reported pothole issue has been assigned to PWD',
//         read: false,
//         timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
//         issueId: 123
//       },
//       {
//         id: 2,
//         type: 'comment',
//         message: 'Municipal worker commented on your garbage collection report',
//         read: true,
//         timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
//         issueId: 124
//       },
//       {
//         id: 3,
//         type: 'resolution',
//         message: 'Your reported streetlight issue has been resolved',
//         read: false,
//         timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
//         issueId: 125
//       },
//       {
//         id: 4,
//         type: 'feedback',
//         message: 'Please provide feedback on recently resolved issue #125',
//         read: false,
//         timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
//         issueId: 125
//       }
//     ];
//   };

//   const handlePhotoCapture = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setReportForm(prev => ({
//           ...prev,
//           photo: e.target.result
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Helper function to get department for a category
//   const getDepartmentForCategory = (categoryId) => {
//     return issueCategories.find(cat => cat.id === categoryId);
//   };

//   // Submit report function with Supabase integration
//   const submitReport = async () => {
//     if (!reportForm.category || !reportForm.description) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     try {
//       // 1. Upload photo if exists
//       let photoUrl = null;
//       if (reportForm.photo) {
//         // Convert base64 to file
//         const base64Data = reportForm.photo.split(',')[1];
//         const byteCharacters = atob(base64Data);
//         const byteArrays = [];
        
//         for (let i = 0; i < byteCharacters.length; i++) {
//           byteArrays.push(byteCharacters.charCodeAt(i));
//         }
        
//         const byteArray = new Uint8Array(byteArrays);
//         const blob = new Blob([byteArray], { type: 'image/jpeg' });
//         const file = new File([blob], 'issue-photo.jpg', { type: 'image/jpeg' });
        
//         // Upload to Supabase Storage
//         const filePath = `${Date.now()}-${userInfo?.id || 'anonymous'}`;
//         const { data, error } = await supabase.storage
//           .from('issue-photos')
//           .upload(filePath, file);
        
//         if (error) throw error;
        
//         // Get public URL
//         const { data: urlData } = supabase.storage
//           .from('issue-photos')
//           .getPublicUrl(filePath);
          
//         photoUrl = urlData.publicUrl;
//       }
      
//       // 2. Get department based on category
//       const category = issueCategories.find(cat => cat.id === reportForm.category);
//       let departmentId = null;
      
//       if (category) {
//         // Get department ID from the department name
//         const { data: deptData } = await supabase
//           .from('departments')
//           .select('id')
//           .ilike('name', `%${category.department.split(' - ')[0]}%`)
//           .single();
          
//         if (deptData) {
//           departmentId = deptData.id;
//         }
//       }
      
//       // 3. Insert issue into database
//       const { data, error } = await supabase
//         .from('issues')
//         .insert([
//           {
//             category: reportForm.category,
//             description: reportForm.description,
//             priority: reportForm.priority,
//             location: reportForm.location,
//             photo_url: photoUrl,
//             user_id: user.id,
//             department_id: departmentId,
//             status: 'new',
//             votes: 0,
//             comments: 0
//           }
//         ])
//         .select();
      
//       if (error) throw error;
      
//       // Reset form
//       setReportForm({ category: '', description: '', priority: 'medium', photo: null, location: reportForm.location });
//       setShowReportForm(false);
      
//       // Create notification for confirmation
//       if (userInfo?.id) {
//         await supabase
//           .from('notifications')
//           .insert([
//             {
//               user_id: userInfo.id,
//               issue_id: data[0].id,
//               type: 'confirmation',
//               message: `Your ${category?.name || 'issue'} report has been submitted successfully`,
//               read: false,
//               created_at: new Date().toISOString()
//             }
//           ]);
//       }
      
//       alert(`Report submitted successfully!\nAssigned to: ${category?.department || 'Municipal Corporation'}`);
//     } catch (error) {
//       console.error('Error submitting report:', error);
      
//       // Fallback to local state if Supabase fails
//       const category = issueCategories.find(cat => cat.id === reportForm.category);
//       const newIssue = {
//         id: Date.now(),
//         ...reportForm,
//         status: 'new',
//         createdAt: new Date().toISOString(),
//         assignedTo: category?.department || 'Municipal Corporation',
//         assignedContact: category?.contact || '+91-651-2446123',
//         assignedEmail: category?.email || 'grievance@municipal.gov.in',
//         updatedAt: new Date().toISOString(),
//         votes: 0,
//         comments: 0,
//         reporter: userInfo ? userInfo.name : 'Anonymous'
//       };

//       setIssues(prev => [newIssue, ...prev]);
//       setReportForm({ category: '', description: '', priority: 'medium', photo: null, location: reportForm.location });
//       setShowReportForm(false);
      
//       alert(`Report submitted successfully (local only)!\nAssigned to: ${newIssue.assignedTo}\nContact: ${newIssue.assignedContact}`);
//     }
//   };

//   // Update issue status with Supabase integration
//   const updateIssueStatus = async (issueId, newStatus) => {
//     try {
//       // Update issue status in database
//       const { error } = await supabase
//         .from('issues')
//         .update({ 
//           status: newStatus,
//           updated_at: new Date().toISOString(),
//           resolved_at: newStatus === 'resolved' ? new Date().toISOString() : null
//         })
//         .eq('id', issueId);
      
//       if (error) throw error;
      
//       // Get issue details for notification
//       const { data: issueData, error: issueError } = await supabase
//         .from('issues')
//         .select('user_id, category')
//         .eq('id', issueId)
//         .single();
      
//       if (issueError) throw issueError;
      
//       // Create notification for the issue owner
//       if (issueData?.user_id) {
//         await supabase
//           .from('notifications')
//           .insert([
//             {
//               user_id: issueData.user_id,
//               issue_id: issueId,
//               type: 'status_update',
//               message: `Status updated to ${newStatus.replace('-', ' ')} for your ${issueData.category} report`,
//               read: false,
//               created_at: new Date().toISOString()
//             }
//           ]);
//       }
      
//       // Update local state as well for immediate UI update
//       setIssues(prev => 
//         prev.map(issue => 
//           issue.id === issueId 
//             ? { ...issue, status: newStatus, updatedAt: new Date().toISOString() }
//             : issue
//         )
//       );
//     } catch (error) {
//       console.error('Error updating issue status:', error);
      
//       // Fallback to local state only
//       setIssues(prev => 
//         prev.map(issue => 
//           issue.id === issueId 
//             ? { ...issue, status: newStatus, updatedAt: new Date().toISOString() }
//             : issue
//         )
//       );
      
//       // Local notification
//       const updatedIssue = issues.find(issue => issue.id === issueId);
//       if (updatedIssue) {
//         const category = issueCategories.find(cat => cat.id === updatedIssue.category);
//         const newNotification = {
//           id: Date.now(),
//           type: 'status_update',
//           message: `Status updated to ${newStatus.replace('-', ' ')} for your ${category?.name || 'issue'} report`,
//           read: false,
//           timestamp: new Date().toISOString(),
//           issueId: issueId
//         };
        
//         setNotifications(prev => [newNotification, ...prev]);
//       }
//     }
//   };

//   // Authentication functions (already updated)
//  const handleLogin = async (e) => {
//   e.preventDefault();
  
//   if (!loginForm.email || !loginForm.password) {
//     alert('Please enter both email and password');
//     return;
//   }
  
//   try {
//     // 1. Sign in with Supabase
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: loginForm.email,
//       password: loginForm.password
//     });
    
//     if (error) throw error;
    
//     // 2. Try to get user profile
//     const { data: profile, error: profileError } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('id', data.user.id)
//       .maybeSingle(); // Use maybeSingle() instead of single()
    
//     // 3. If profile not found, create one
//     if (!profile) {
//       // Get user metadata
//       const { data: userData } = await supabase.auth.getUser();
//       const userMeta = userData?.user?.user_metadata || {};
      
//       // Create profile
//       const { data: newProfile, error: insertError } = await supabase
//         .from('profiles')
//         .insert([
//           {
//             id: data.user.id,
//             name: userMeta.name || loginForm.email.split('@')[0],
//             role: 'citizen',
//             address: userMeta.address || 'Jharkhand'
//           }
//         ])
//         .select()
//         .single();
      
//       if (insertError) {
//         console.error('Could not create profile:', insertError);
//         // Continue anyway with basic info
//       }
      
//       setUserInfo({
//         id: data.user.id,
//         name: userMeta.name || loginForm.email.split('@')[0],
//         email: data.user.email,
//         role: 'citizen',
//         address: userMeta.address || 'Jharkhand',
//         joinedOn: new Date().toISOString().split('T')[0]
//       });
//     } else {
//       // Use existing profile
//       setUserInfo({
//         id: data.user.id,
//         name: profile.name,
//         email: data.user.email,
//         phone: profile.phone,
//         role: profile.role || 'citizen',
//         address: profile.address,
//         joinedOn: new Date(profile.created_at || data.user.created_at).toISOString().split('T')[0]
//       });
//     }
    
//     // 4. Navigate to appropriate view
//     setCurrentView(userInfo?.role === 'admin' ? 'admin' : 'citizen');
//   } catch (error) {
//     console.error('Login error:', error);
//     alert('Login failed: ' + error.message);
//   }
// };


//   const handleRegister = async (e) => {
//   e.preventDefault();
  
//   if (!registerForm.name || !registerForm.email || !registerForm.phone || !registerForm.password) {
//     alert('Please fill in all required fields');
//     return;
//   }
  
//   if (registerForm.password !== registerForm.confirmPassword) {
//     alert('Passwords do not match');
//     return;
//   }
  
//   try {
//     // Create user with metadata
//     const { data, error } = await supabase.auth.signUp({
//       email: registerForm.email,
//       password: registerForm.password,
//       options: {
//         data: {
//           name: registerForm.name,
//           phone: registerForm.phone,
//           address: 'Jharkhand'
//         }
//       }
//     });
    
//     if (error) throw error;
    
//     // Auto-login for testing (since you've disabled email verification)
//     const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
//       email: registerForm.email,
//       password: registerForm.password
//     });
    
//     if (loginError) throw loginError;
    
//     // Set user info
//     setUserInfo({
//       id: loginData.user.id,
//       name: registerForm.name,
//       email: registerForm.email,
//       phone: registerForm.phone,
//       role: 'citizen',
//       address: 'Jharkhand',
//       joinedOn: new Date().toISOString().split('T')[0]
//     });
    
//     setCurrentView('citizen');
//     alert('Registration successful! Welcome to CitizenReport.');
//   } catch (error) {
//     console.error('Registration error:', error);
//     alert('Registration failed: ' + error.message);
//   }
// };

  

//   const handleLogout = async () => {
//     try {
//       // Sign out from Supabase
//       const { error } = await supabase.auth.signOut();
      
//       if (error) throw error;
      
//       // Clear user data and return to login screen
//       setUserInfo(null);
//       setCurrentView('login');
//     } catch (error) {
//       console.error('Logout error:', error);
//       alert('Error signing out: ' + error.message);
//     }
//   };

//   // Mark notification as read with Supabase integration
//   const markNotificationAsRead = async (notificationId) => {
//     try {
//       // Update in database
//       const { error } = await supabase
//         .from('notifications')
//         .update({ read: true })
//         .eq('id', notificationId);
      
//       if (error) throw error;
      
//       // Update local state
//       setNotifications(prev => 
//         prev.map(notification => 
//           notification.id === notificationId 
//             ? { ...notification, read: true }
//             : notification
//         )
//       );
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//       // Fallback to local state update
//       setNotifications(prev => 
//         prev.map(notification => 
//           notification.id === notificationId 
//             ? { ...notification, read: true }
//             : notification
//         )
//       );
//     }
//   };

//   const filteredIssues = issues.filter(issue => {
//     const categoryMatch = filterCategory === 'all' || issue.category === filterCategory;
//     const statusMatch = filterStatus === 'all' || issue.status === filterStatus;
//     const searchMatch = !searchQuery || 
//       issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       issue.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
//     return categoryMatch && statusMatch && searchMatch;
//   });

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'new': return <AlertCircle className="w-4 h-4 text-red-500" />;
//       case 'in-progress': return <Clock className="w-4 h-4 text-yellow-500" />;
//       case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'new': return 'bg-red-100 text-red-800';
//       case 'in-progress': return 'bg-yellow-100 text-yellow-800';
//       case 'resolved': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'bg-red-100 text-red-800';
//       case 'medium': return 'bg-yellow-100 text-yellow-800';
//       case 'low': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
//     ));
//   };

//   const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffInSeconds = Math.floor((now - date) / 1000);
    
//     if (diffInSeconds < 60) {
//       return 'Just now';
//     } else if (diffInSeconds < 3600) {
//       return `${Math.floor(diffInSeconds / 60)} min ago`;
//     } else if (diffInSeconds < 86400) {
//       return `${Math.floor(diffInSeconds / 3600)} hr ago`;
//     } else {
//       return date.toLocaleDateString();
//     }
//   };




import supabase from './lib/supabaseClient';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Camera, MapPin, Send, AlertCircle, CheckCircle, Clock, Filter,
  Settings, BarChart3, Users, Zap, Home, User, Search, Bell, Eye,
  Trash2, Lightbulb, Construction, Trees, Phone, Mail, Shield,
  LogIn, UserPlus, Lock, ArrowRight, LogOut, MapPinned, MessageCircle,
  ThumbsUp, Calendar, UserCog, FileText, ChevronDown, X, Menu,
  Map, List, Info, Heart, HelpCircle, Award, ThumbsDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const CivicReportingSystem = () => {
  const [currentView, setCurrentView] = useState('login');
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [userInfo, setUserInfo] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef(null);

  const analyticsData = {
    trends: [
      { month: 'Jan', reports: 45, resolved: 42 },
      { month: 'Feb', reports: 52, resolved: 48 },
      { month: 'Mar', reports: 48, resolved: 45 },
      { month: 'Apr', reports: 61, resolved: 55 },
      { month: 'May', reports: 55, resolved: 52 },
      { month: 'Jun', reports: 67, resolved: 58 }
    ],
    categories: [
      { name: 'Potholes', value: 35, color: '#ef4444' },
      { name: 'Streetlights', value: 28, color: '#f59e0b' },
      { name: 'Garbage', value: 22, color: '#10b981' },
      { name: 'Water', value: 15, color: '#3b82f6' }
    ]
  };

  const issueCategories = [
    { 
      id: 'pothole', 
      name: 'Pothole', 
      icon: Construction, 
      color: 'bg-red-500', 
      department: 'PWD - Roads Division', 
      contact: '+91-651-2446688',
      email: 'pwd.roads@jharkhand.gov.in'
    },
    { 
      id: 'streetlight', 
      name: 'Streetlight', 
      icon: Lightbulb, 
      color: 'bg-yellow-500', 
      department: 'JUSNL (Jharkhand Urban Services)', 
      contact: '+91-651-2491234',
      email: 'streetlight@jusnl.jharkhand.gov.in'
    },
    { 
      id: 'garbage', 
      name: 'Garbage', 
      icon: Trash2, 
      color: 'bg-green-500', 
      department: 'Urban Development Dept.', 
      contact: '+91-651-2480456',
      email: 'sanitation@urban.jharkhand.gov.in'
    },
    { 
      id: 'water', 
      name: 'Water Issue', 
      icon: AlertCircle, 
      color: 'bg-blue-500', 
      department: 'PHED (Public Health Engineering)', 
      contact: '+91-651-2491567',
      email: 'water@phed.jharkhand.gov.in'
    },
    { 
      id: 'tree', 
      name: 'Tree/Park', 
      icon: Trees, 
      color: 'bg-emerald-500', 
      department: 'Forest & Environment Dept.', 
      contact: '+91-651-2446789',
      email: 'parks@forest.jharkhand.gov.in'
    },
    { 
      id: 'other', 
      name: 'Other', 
      icon: AlertCircle, 
      color: 'bg-gray-500', 
      department: 'Municipal Corporation', 
      contact: '+91-651-2446123',
      email: 'grievance@ranchi.municipal.gov.in'
    }
  ];

  const governmentDepartments = [
    {
      name: 'Public Works Department (PWD)',
      head: 'Shri Rajesh Kumar Singh, Chief Engineer',
      responsibilities: 'Road construction, maintenance, bridges, government buildings',
      performance: { resolved: 156, pending: 23, avgTime: '4.2 days' },
      contact: 'pwd.jharkhand@gov.in',
      phone: '+91-651-2446688',
      rating: 4.6
    },
    {
      name: 'Jharkhand Urban Services (JUSNL)',
      head: 'Smt. Priya Sharma, Managing Director',
      responsibilities: 'Street lighting, urban infrastructure, electricity distribution',
      performance: { resolved: 89, pending: 12, avgTime: '2.8 days' },
      contact: 'md.jusnl@jharkhand.gov.in',
      phone: '+91-651-2491234',
      rating: 4.8
    },
    {
      name: 'Urban Development Department',
      head: 'Shri Anil Kumar Pandey, Secretary',
      responsibilities: 'Waste management, urban planning, sanitation',
      performance: { resolved: 134, pending: 18, avgTime: '3.5 days' },
      contact: 'secy.urban@jharkhand.gov.in',
      phone: '+91-651-2480456',
      rating: 4.4
    },
    {
      name: 'Public Health Engineering Dept.',
      head: 'Dr. Sunita Devi, Chief Engineer',
      responsibilities: 'Water supply, drainage, sewerage systems',
      performance: { resolved: 67, pending: 8, avgTime: '5.1 days' },
      contact: 'ce.phed@jharkhand.gov.in',
      phone: '+91-651-2491567',
      rating: 4.2
    }
  ];

  const [reportForm, setReportForm] = useState({
    category: '',
    description: '',
    priority: 'medium',
    photo: null,
    location: ''
  });

  // Helper function to get department for a category
  const getDepartmentForCategory = (categoryId) => {
    return issueCategories.find(cat => cat.id === categoryId);
  };

  // Generate sample notifications
  const generateSampleNotifications = () => {
    return [
      {
        id: 1,
        type: 'status_update',
        message: 'Your reported pothole issue has been assigned to PWD',
        read: false,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        issueId: 123
      },
      {
        id: 2,
        type: 'comment',
        message: 'Municipal worker commented on your garbage collection report',
        read: true,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        issueId: 124
      },
      {
        id: 3,
        type: 'resolution',
        message: 'Your reported streetlight issue has been resolved',
        read: false,
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        issueId: 125
      },
      {
        id: 4,
        type: 'feedback',
        message: 'Please provide feedback on recently resolved issue #125',
        read: false,
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        issueId: 125
      }
    ];
  };

  // Create fetchIssues with useCallback to avoid dependency issues
  const fetchIssues = useCallback(async () => {
    try {
      console.log("Fetching issues...");
      let { data, error } = await supabase
        .from('issues')
        .select(`
          *,
          profiles:user_id (name),
          departments:department_id (name, phone, email)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching issues:", error);
        throw error;
      }
      
      console.log("Fetched issues:", data);
      
      if (data && data.length > 0) {
        const transformedIssues = data.map(issue => ({
          id: issue.id,
          category: issue.category,
          description: issue.description,
          priority: issue.priority || 'medium',
          location: issue.location,
          photo: issue.photo_url,
          status: issue.status,
          createdAt: issue.created_at,
          updatedAt: issue.updated_at,
          assignedTo: issue.departments?.name || getDepartmentForCategory(issue.category)?.department || 'Municipal Corporation',
          assignedContact: issue.departments?.phone || getDepartmentForCategory(issue.category)?.contact || '+91-651-2446123',
          assignedEmail: issue.departments?.email || getDepartmentForCategory(issue.category)?.email || 'grievance@municipal.gov.in',
          votes: issue.votes || 0,
          comments: issue.comments || 0,
          reporter: issue.profiles?.name || 'Anonymous',
          userId: issue.user_id
        }));
        
        setIssues(transformedIssues);
      } else {
        setIssues([]);
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
      setIssues([]);
    }
  }, []);

  // Function to fetch notifications
  const fetchNotifications = useCallback(async (userId) => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setNotifications(data);
      } else {
        const sampleNotifications = generateSampleNotifications();
        setNotifications(sampleNotifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      const sampleNotifications = generateSampleNotifications();
      setNotifications(sampleNotifications);
    }
  }, []);

  // Check for existing session
  useEffect(() => {
    const checkUser = async () => {
      try {
        console.log("Checking user session...");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log("Found session:", session.user.id);
          
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
          
          if (error) {
            console.error("Error fetching profile:", error);
            return;
          }
          
          if (!profile) {
            console.log("No profile found, creating one");
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([{
                id: session.user.id,
                name: session.user.email.split('@')[0],
                role: 'citizen',
                address: 'Jharkhand'
              }])
              .select();
            
            if (insertError) {
              console.error("Error creating profile:", insertError);
              return;
            }
            
            setUserInfo({
              id: session.user.id,
              name: session.user.email.split('@')[0],
              email: session.user.email,
              role: 'citizen',
              address: 'Jharkhand',
              joinedOn: new Date().toISOString().split('T')[0]
            });
          } else {
            console.log("Profile found:", profile);
            setUserInfo({
              id: session.user.id,
              name: profile.name || session.user.email.split('@')[0],
              email: session.user.email,
              phone: profile.phone,
              role: profile.role || 'citizen',
              address: profile.address || 'Jharkhand',
              joinedOn: profile.created_at ? new Date(profile.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            });
          }
          
          setCurrentView('citizen');
          console.log("User logged in and redirected to citizen view");
        } else {
          console.log("No session found, staying on login screen");
        }
      } catch (error) {
        console.error("Session check error:", error);
      }
    };
    
    checkUser();
  }, []);

  // Geolocation and set up real-time subscriptions
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setReportForm(prev => ({
          ...prev,
          location: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
        }));
      });
    }
    
    fetchIssues();

    const issuesSubscription = supabase
      .channel('public:issues')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'issues' }, () => {
        fetchIssues();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(issuesSubscription);
    };
  }, [fetchIssues]);

  // Notifications subscription
  useEffect(() => {
    if (!userInfo?.id) return;

    fetchNotifications(userInfo.id);
    
    const notificationSubscription = supabase
      .channel('public:notifications')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userInfo.id}` }, 
        payload => {
          setNotifications(prev => [payload.new, ...prev]);
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(notificationSubscription);
    };
  }, [userInfo?.id, fetchNotifications]);

  const handlePhotoCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setReportForm(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  


  // Submit report function with Supabase integration - FIXED user.id issue
  // const submitReport = async () => {
  //   if (!reportForm.category || !reportForm.description) {
  //     alert('Please fill in all required fields');
  //     return;
  //   }

  //   try {
  //     // 1. Upload photo if exists
  //     let photoUrl = null;
  //     if (reportForm.photo) {
  //       // Convert base64 to file
  //       const base64Data = reportForm.photo.split(',')[1];
  //       const byteCharacters = atob(base64Data);
  //       const byteArrays = [];
        
  //       for (let i = 0; i < byteCharacters.length; i++) {
  //         byteArrays.push(byteCharacters.charCodeAt(i));
  //       }
        
  //       const byteArray = new Uint8Array(byteArrays);
  //       const blob = new Blob([byteArray], { type: 'image/jpeg' });
  //       const file = new File([blob], 'issue-photo.jpg', { type: 'image/jpeg' });
        
  //       // Upload to Supabase Storage
  //       const filePath = `${Date.now()}-${userInfo?.id || 'anonymous'}`;
  //       const { data, error } = await supabase.storage
  //         .from('issue-photos')
  //         .upload(filePath, file);
        
  //       if (error) throw error;
        
  //       // Get public URL
  //       const { data: urlData } = supabase.storage
  //         .from('issue-photos')
  //         .getPublicUrl(filePath);
          
  //       photoUrl = urlData.publicUrl;
  //     }
      
  //     // 2. Get department based on category
  //     const category = issueCategories.find(cat => cat.id === reportForm.category);
  //     let departmentId = null;
      
  //     if (category) {
  //       // Get department ID from the department name
  //       const { data: deptData } = await supabase
  //         .from('departments')
  //         .select('id')
  //         .ilike('name', `%${category.department.split(' - ')[0]}%`)
  //         .single();
          
  //       if (deptData) {
  //         departmentId = deptData.id;
  //       }
  //     }
      
  //     // 3. Insert issue into database
  //     const { data, error } = await supabase
  //       .from('issues')
  //       .insert([
  //         {
  //           category: reportForm.category,
  //           description: reportForm.description,
  //           priority: reportForm.priority,
  //           location: reportForm.location,
  //           photo_url: photoUrl,
  //           user_id: userInfo?.id, // FIXED: Changed from user.id to userInfo?.id
  //           department_id: departmentId,
  //           status: 'new',
  //           votes: 0,
  //           comments: 0
  //         }
  //       ])
  //       .select();
      
  //     if (error) throw error;
      
  //     // Reset form
  //     setReportForm({ category: '', description: '', priority: 'medium', photo: null, location: reportForm.location });
  //     setShowReportForm(false);
      
  //     // Create notification for confirmation
  //     if (userInfo?.id) {
  //       await supabase
  //         .from('notifications')
  //         .insert([
  //           {
  //             user_id: userInfo.id,
  //             issue_id: data[0].id,
  //             type: 'confirmation',
  //             message: `Your ${category?.name || 'issue'} report has been submitted successfully`,
  //             read: false,
  //             created_at: new Date().toISOString()
  //           }
  //         ]);
  //     }
      
  //     // Fetch issues to update the list with the new issue
  //     fetchIssues();
      
  //     alert(`Report submitted successfully!\nAssigned to: ${category?.department || 'Municipal Corporation'}`);
  //   } catch (error) {
  //     console.error('Error submitting report:', error);
      
  //     // Fallback to local state if Supabase fails
  //     const category = issueCategories.find(cat => cat.id === reportForm.category);
  //     const newIssue = {
  //       id: Date.now(),
  //       ...reportForm,
  //       status: 'new',
  //       createdAt: new Date().toISOString(),
  //       assignedTo: category?.department || 'Municipal Corporation',
  //       assignedContact: category?.contact || '+91-651-2446123',
  //       assignedEmail: category?.email || 'grievance@municipal.gov.in',
  //       updatedAt: new Date().toISOString(),
  //       votes: 0,
  //       comments: 0,
  //       reporter: userInfo ? userInfo.name : 'Anonymous'
  //     };

  //     setIssues(prev => [newIssue, ...prev]);
  //     setReportForm({ category: '', description: '', priority: 'medium', photo: null, location: reportForm.location });
  //     setShowReportForm(false);
      
  //     alert(`Report submitted successfully (local only)!\nAssigned to: ${newIssue.assignedTo}\nContact: ${newIssue.assignedContact}`);
  //   }
  // };




// At the beginning of submitReport


// const submitReport = async () => {
//   if (!reportForm.category || !reportForm.description) {
//     alert('Please fill in all required fields');
//     return;
//   }

//   try {
//     console.log("Submitting report with user ID:", userInfo?.id);
    
//     // Simple insert without all the complexity
//     const { data, error } = await supabase
//       .from('issues')
//       .insert([
//         {
//           category: reportForm.category,
//           description: reportForm.description,
//           priority: reportForm.priority,
//           location: reportForm.location,
//           user_id: userInfo?.id, // Make sure this is set correctly
//           status: 'new'
//         }
//       ]);
    
//     if (error) {
//       console.error("Insert error details:", error);
//       throw error;
//     }
    
//     alert("Report submitted successfully!");
//     setReportForm({ category: '', description: '', priority: 'medium', photo: null, location: reportForm.location });
//     setShowReportForm(false);
    
//     // Refresh issues list
//     fetchIssues();
    
//   } catch (error) {
//     console.error('Error submitting report:', error);
//     alert('Failed to submit report: ' + error.message);
//   }
// };



// Submit report function with Supabase integration - fixed version
// Submit report function with Supabase integration - fixed version





  const submitReport = async () => {
    if (!reportForm.category || !reportForm.description) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert("You must be logged in to submit a report");
        return;
      }
      
      let photoUrl = null;
      if (reportForm.photo) {
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.jpg`;
        
        const base64Data = reportForm.photo.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArrays.push(byteCharacters.charCodeAt(i));
        }
        
        const byteArray = new Uint8Array(byteArrays);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        const file = new File([blob], fileName, { type: 'image/jpeg' });
        
        console.log("Uploading photo...");
        
        const { data, error } = await supabase.storage
          .from('issue-photos')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (error) {
          console.error("Photo upload error:", error);
          throw error;
        }
        
        const { data: urlData } = supabase.storage
          .from('issue-photos')
          .getPublicUrl(fileName);
          
        photoUrl = urlData.publicUrl;
      }
      
      const { error } = await supabase
        .from('issues')
        .insert({
          category: reportForm.category,
          description: reportForm.description,
          priority: reportForm.priority,
          location: reportForm.location,
          photo_url: photoUrl,
          user_id: session.user.id,
          status: 'new'
        });
      
      if (error) {
        console.error("Issue submit error:", error);
        throw error;
      }
      
      setReportForm({ category: '', description: '', priority: 'medium', photo: null, location: reportForm.location });
      setShowReportForm(false);
      
      alert("Report submitted successfully!");
      
      fetchIssues();
      
    } catch (error) {
      console.error("Error submitting report:", error);
      alert(`Failed to submit report: ${error.message}`);
    }
  };

  const updateIssueStatus = async (issueId, newStatus) => {
    try {
      console.log(`Updating issue ${issueId} to status: ${newStatus}`);
      
      const { error } = await supabase
        .from('issues')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString(),
          resolved_at: newStatus === 'resolved' ? new Date().toISOString() : null
        })
        .eq('id', issueId);
      
      if (error) {
        console.error("Status update error:", error);
        throw error;
      }
      
      console.log("Status updated successfully");
      
      const { data: issueData, error: issueError } = await supabase
        .from('issues')
        .select('user_id, category')
        .eq('id', issueId)
        .single();
      
      if (issueError) {
        console.error("Error fetching issue data:", issueError);
        throw issueError;
      }
      
      if (issueData?.user_id) {
        console.log("Creating notification for user:", issueData.user_id);
        const { error: notifError } = await supabase
          .from('notifications')
          .insert([
            {
              user_id: issueData.user_id,
              issue_id: issueId,
              type: 'status_update',
              message: `Status updated to ${newStatus.replace('-', ' ')} for your ${issueData.category} report`,
              read: false,
              created_at: new Date().toISOString()
            }
          ]);
        
        if (notifError) {
          console.error("Error creating notification:", notifError);
        }
      }
      
      setIssues(prev => 
        prev.map(issue => 
          issue.id === issueId 
            ? { ...issue, status: newStatus, updatedAt: new Date().toISOString() }
            : issue
        )
      );
      
      fetchIssues();
    } catch (error) {
      console.error('Error updating issue status:', error);
      alert('Failed to update status: ' + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      alert('Please enter both email and password');
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password
      });
      
      if (error) throw error;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();
      
      let userRole = 'citizen';
      
      if (!profile) {
        const { data: userData } = await supabase.auth.getUser();
        const userMeta = userData?.user?.user_metadata || {};
        
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              name: userMeta.name || loginForm.email.split('@')[0],
              role: 'citizen',
              address: userMeta.address || 'Jharkhand'
            }
          ])
          .select()
          .single();
        
        if (insertError) {
          console.error('Could not create profile:', insertError);
        }
        
        setUserInfo({
          id: data.user.id,
          name: userMeta.name || loginForm.email.split('@')[0],
          email: data.user.email,
          role: userRole,
          address: userMeta.address || 'Jharkhand',
          joinedOn: new Date().toISOString().split('T')[0]
        });
      } else {
        userRole = profile.role || 'citizen';
        
        setUserInfo({
          id: data.user.id,
          name: profile.name,
          email: data.user.email,
          phone: profile.phone,
          role: userRole,
          address: profile.address,
          joinedOn: new Date(profile.created_at || data.user.created_at).toISOString().split('T')[0]
        });
      }
      
      await fetchIssues();
      await fetchNotifications(data.user.id);
      
      setCurrentView(userRole === 'admin' ? 'admin' : 'citizen');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!registerForm.name || !registerForm.email || !registerForm.phone || !registerForm.password) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: registerForm.email,
        password: registerForm.password,
        options: {
          data: {
            name: registerForm.name,
            phone: registerForm.phone,
            address: 'Jharkhand'
          }
        }
      });
      
      if (error) throw error;
      
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: registerForm.email,
        password: registerForm.password
      });
      
      if (loginError) throw loginError;
      
      setUserInfo({
        id: loginData.user.id,
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone,
        role: 'citizen',
        address: 'Jharkhand',
        joinedOn: new Date().toISOString().split('T')[0]
      });
      
      await fetchIssues();
      await fetchNotifications(loginData.user.id);
      
      setCurrentView('citizen');
      alert('Registration successful! Welcome to CitizenReport.');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUserInfo(null);
      setCurrentView('login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error signing out: ' + error.message);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);
      
      if (error) throw error;
      
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
    }
  };

  const filteredIssues = issues.filter(issue => {
    const categoryMatch = filterCategory === 'all' || issue.category === filterCategory;
    const statusMatch = filterStatus === 'all' || issue.status === filterStatus;
    const searchMatch = !searchQuery || 
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && statusMatch && searchMatch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
    ));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} min ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hr ago`;
    } else {
      return date.toLocaleDateString();
    }
  };



  // Login View
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">CitizenReport</h1>
                <p className="text-sm text-gray-600">Government of Jharkhand</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setCurrentView('register')}
                className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Register
              </button>
              <button
                onClick={() => setCurrentView('login')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
              >
                Login
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                  <p className="text-gray-600 mt-1">Login to access your account</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                        <label className="ml-2 text-sm text-gray-600">Remember me</label>
                      </div>
                      <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">Forgot password?</a>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </button>
                </form>
                
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setCurrentView('register')}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Register Now
                    </button>
                  </p>
                </div>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-2 text-sm text-gray-500">Demo Login</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setLoginForm({ email: 'citizen@example.com', password: 'password' });
                        setUserInfo({
                          name: 'Rahul Kumar',
                          email: 'citizen@example.com',
                          phone: '+91 98765 43210',
                          role: 'citizen',
                          id: 'CIT001',
                          address: 'Harmu Housing Colony, Ranchi',
                          joinedOn: '2023-06-15'
                        });
                        setCurrentView('citizen');
                      }}
                      className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Citizen Demo
                    </button>
                    <button
                      onClick={() => {
                        setLoginForm({ email: 'admin@jharkhand.gov.in', password: 'admin123' });
                        setUserInfo({
                          name: 'Admin User',
                          email: 'admin@jharkhand.gov.in',
                          role: 'admin',
                          id: 'ADM001',
                          department: 'Municipal Corporation',
                          joinedOn: '2022-04-10'
                        });
                        setCurrentView('admin');
                      }}
                      className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Admin Demo
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 py-4 px-6 text-center">
                <p className="text-xs text-gray-600">
                  © 2025 Government of Jharkhand • Department of Higher and Technical Education
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Register View
  if (currentView === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">CitizenReport</h1>
                <p className="text-sm text-gray-600">Government of Jharkhand</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setCurrentView('register')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
              >
                Register
              </button>
              <button
                onClick={() => setCurrentView('login')}
                className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Login
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
                  <p className="text-gray-600 mt-1">Join our civic reporting platform</p>
                </div>
                
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Create a strong password"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-800">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</a>
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 mt-6"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                  </button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button 
                      onClick={() => setCurrentView('login')}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Login Instead
                    </button>
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 py-4 px-6 text-center">
                <p className="text-xs text-gray-600">
                  © 2025 Government of Jharkhand • Department of Higher and Technical Education
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'citizen') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-7 h-7 text-indigo-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">CitizenReport</h1>
                <p className="text-sm text-gray-600">Jharkhand Government</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-1">
                <Map className="w-4 h-4" />
                <span>Nearby</span>
              </button>
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-1">
                <List className="w-4 h-4" />
                <span>My Reports</span>
              </button>
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-1">
                <Info className="w-4 h-4" />
                <span>Help</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)} 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="p-3 border-b flex items-center justify-between">
                      <h3 className="font-medium text-gray-800">Notifications</h3>
                      <button className="text-xs text-indigo-600">Mark all as read</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p>No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map(notification => (
                          <div 
                            key={notification.id} 
                            className={`p-3 border-b ${notification.read ? 'bg-white' : 'bg-blue-50'} hover:bg-gray-50`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex">
                              <div className="flex-shrink-0 mr-3">
                                {notification.type === 'status_update' && (
                                  <Clock className="w-5 h-5 text-yellow-500" />
                                )}
                                {notification.type === 'comment' && (
                                  <MessageCircle className="w-5 h-5 text-blue-500" />
                                )}
                                {notification.type === 'resolution' && (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                )}
                                {notification.type === 'confirmation' && (
                                  <Info className="w-5 h-5 text-indigo-500" />
                                )}
                                {notification.type === 'feedback' && (
                                  <ThumbsUp className="w-5 h-5 text-purple-500" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-800">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{formatTimestamp(notification.timestamp)}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-3 bg-gray-50 text-center">
                      <button className="text-sm text-indigo-600 hover:text-indigo-800">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">{userInfo?.name?.charAt(0) || 'U'}</span>
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-gray-700">{userInfo?.name || 'User'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {showMobileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="p-3 border-b">
                      <p className="font-medium text-gray-800">{userInfo?.name}</p>
                      <p className="text-xs text-gray-500">{userInfo?.email}</p>
                    </div>
                    <div>
                      <button 
                        onClick={() => setCurrentView('admin')}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span>Admin Dashboard</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Profile</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span>Settings</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                        <HelpCircle className="w-4 h-4 text-gray-500" />
                        <span>Help & Support</span>
                      </button>
                      <div className="border-t">
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 space-y-6">
          {!showReportForm ? (
            <>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Make Your City Better</h2>
                <p className="text-indigo-100 mb-4">Report civic issues and track their resolution in real-time</p>
                <button 
                  onClick={() => setShowReportForm(true)}
                  className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Report an Issue</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-2xl font-bold text-green-600">{issues.filter(i => i.status === 'resolved').length}</div>
                  <div className="text-sm text-gray-600">Resolved</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-2xl font-bold text-yellow-600">{issues.filter(i => i.status === 'in-progress').length}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-2xl font-bold text-red-600">{issues.filter(i => i.status === 'new').length}</div>
                  <div className="text-sm text-gray-600">New</div>
                </div>
              </div>
              
              {/* View toggle and search */}
              <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <Map className="w-5 h-5" />
                  </button>
                  <div className="h-6 border-r border-gray-300 mx-1"></div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Categories</option>
                    {issueCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search issues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Government Departments Section */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <span>Government Departments & Performance</span>
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Responsible departments and their contact information</p>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {governmentDepartments.map((dept, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800">{dept.name}</h4>
                            <p className="text-sm text-indigo-600 mt-1">{dept.head}</p>
                          </div>
                          <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 rounded-full">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-green-700 font-medium">Active</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{dept.responsibilities}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{dept.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{dept.contact}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 bg-gray-50 rounded-lg p-2 mb-2">
                          <div className="text-center">
                            <div className="text-sm font-bold text-green-600">{dept.performance.resolved}</div>
                            <div className="text-xs text-gray-600">Resolved</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-yellow-600">{dept.performance.pending}</div>
                            <div className="text-xs text-gray-600">Pending</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-blue-600">{dept.performance.avgTime}</div>
                            <div className="text-xs text-gray-600">Avg Time</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Performance Rating:</span>
                          <div className="flex items-center space-x-1">
                            {renderStars(dept.rating)}
                            <span className="text-xs text-gray-600 ml-1">{dept.rating}/5</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Recent Reports</span>
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {viewMode === 'list' ? (
                    filteredIssues.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No reports match your filters</p>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                      </div>
                    ) : (
                      filteredIssues.slice(0, 5).map((issue) => {
                        const category = issueCategories.find(cat => cat.id === issue.category);
                        return (
                          <div key={issue.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className={`p-2 rounded-lg ${category?.color || 'bg-gray-500'}`}>
                              {category && React.createElement(category.icon, { className: "w-5 h-5 text-white" })}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-800 truncate">{issue.description}</p>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                                  {issue.status.replace('-', ' ')}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                {getStatusIcon(issue.status)}
                                <span className="text-sm text-gray-600 capitalize">{issue.status.replace('-', ' ')}</span>
                                <span className="text-xs text-gray-500">• {new Date(issue.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-indigo-600">Assigned: {issue.assignedTo}</p>
                                <div className="flex items-center space-x-3 text-gray-500">
                                  <button className="flex items-center space-x-1 text-xs hover:text-indigo-600">
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>{issue.votes}</span>
                                  </button>
                                  <button className="flex items-center space-x-1 text-xs hover:text-indigo-600">
                                    <MessageCircle className="w-3 h-3" />
                                    <span>{issue.comments}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )
                  ) : (
                    <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                      <div className="text-center">
                        <MapPinned className="w-10 h-10 text-indigo-500 mx-auto mb-2" />
                        <p className="text-gray-600">Map view will be available in the next update</p>
                        <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">
                          Explore Nearby Issues
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 border-t">
                  <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    View All Reports
                  </button>
                </div>
              </div>

              {/* Helpful resources section */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <Info className="w-5 h-5 text-indigo-600" />
                    <span>Helpful Resources</span>
                  </h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col">
                      <div className="p-2 rounded-lg bg-blue-100 w-fit mb-3">
                        <HelpCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <h4 className="text-sm font-semibold mb-1">How to Report Issues</h4>
                      <p className="text-xs text-gray-600 flex-1">Learn how to effectively report civic issues with proper details</p>
                      <button className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                        Read Guide
                      </button>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col">
                      <div className="p-2 rounded-lg bg-yellow-100 w-fit mb-3">
                        <Award className="w-5 h-5 text-yellow-600" />
                      </div>
                      <h4 className="text-sm font-semibold mb-1">Citizen Engagement Program</h4>
                      <p className="text-xs text-gray-600 flex-1">Join our initiative to foster community participation in governance</p>
                      <button className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                        Join Program
                      </button>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col">
                      <div className="p-2 rounded-lg bg-green-100 w-fit mb-3">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <h4 className="text-sm font-semibold mb-1">Government Initiatives</h4>
                      <p className="text-xs text-gray-600 flex-1">Explore various government schemes and initiatives for citizens</p>
                      <button className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                        View Initiatives
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Report an Issue</h2>
                <button 
                  onClick={() => setShowReportForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Category *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {issueCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setReportForm(prev => ({ ...prev, category: category.id }))}
                        className={`p-3 rounded-lg border-2 transition-colors flex flex-col items-center space-y-1 ${
                          reportForm.category === category.id 
                            ? 'border-indigo-500 bg-indigo-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${category.color}`}>
                          {React.createElement(category.icon, { className: "w-4 h-4 text-white" })}
                        </div>
                        <span className="text-xs font-medium text-gray-700">{category.name}</span>
                        {reportForm.category === category.id && (
                          <span className="text-xs text-indigo-600 text-center">→ {category.department}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={reportForm.description}
                    onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the issue in detail..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={reportForm.priority}
                    onChange={(e) => setReportForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {reportForm.location || 'Getting location...'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoCapture}
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 transition-colors flex flex-col items-center space-y-2"
                    >
                      <Camera className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">Tap to capture photo</span>
                    </button>
                    {reportForm.photo && (
                      <div className="relative">
                        <img 
                          src={reportForm.photo} 
                          alt="Captured issue" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setReportForm(prev => ({ ...prev, photo: null }))}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={submitReport}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Report</span>
                </button>
              </div>
            </div>
          )}
        </div>


        {/* Government Verification Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Government of Jharkhand - Verified System</h3>
              <p className="text-indigo-100">Department of Higher and Technical Education</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">System Authorization</h4>
              <p className="text-sm text-indigo-100">Authorized by Chief Secretary, Jharkhand</p>
              <p className="text-xs text-indigo-200 mt-1">Ref: CS/DHTE/2024/156</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Data Security</h4>
              <p className="text-sm text-indigo-100">ISO 27001 Certified Infrastructure</p>
              <p className="text-xs text-indigo-200 mt-1">NIC Data Center Compliance</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Legal Framework</h4>
              <p className="text-sm text-indigo-100">Right to Information Act, 2005</p>
              <p className="text-xs text-indigo-200 mt-1">Citizen Charter Compliant</p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-white border-opacity-20">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span>System ID: JH-CIVIC-2024-001</span>
                <span>•</span>
                <span>Last Audit: June 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Verified by:</span>
                <span className="font-semibold">NIC Jharkhand</span>
              </div>
            </div>
          </div>
        </div>

        


        
        



        <footer className="bg-white border-t mt-10 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg font-bold text-gray-800">CitizenReport</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  A civic issue reporting platform by the Government of Jharkhand to empower citizens and enhance municipal services.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">About Us</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">How It Works</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Departments</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">FAQ</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Government Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Jharkhand Portal</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Municipal Corporation</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">e-Governance Services</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Public Information</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Tenders & Notices</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Contact Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Department of Higher & Technical Education, Govt. of Jharkhand, Project Building, Dhurwa, Ranchi - 834004</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">+91-651-2400001</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">support@citizenreport.jharkhand.gov.in</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-6 text-center">
              <p className="text-sm text-gray-600">
                © 2025 Government of Jharkhand • Department of Higher and Technical Education • All rights reserved
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-7 h-7 text-indigo-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Municipal Dashboard</h1>
              <p className="text-sm text-gray-600">Civic Issue Management System - Government of Jharkhand</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              >
                <Bell className="w-6 h-6 text-gray-600" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="p-3 border-b flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Notifications</h3>
                    <button className="text-xs text-indigo-600">Mark all as read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p>No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b ${notification.read ? 'bg-white' : 'bg-blue-50'} hover:bg-gray-50`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex">
                            <div className="flex-shrink-0 mr-3">
                              {notification.type === 'status_update' && (
                                <Clock className="w-5 h-5 text-yellow-500" />
                              )}
                              {notification.type === 'comment' && (
                                <MessageCircle className="w-5 h-5 text-blue-500" />
                              )}
                              {notification.type === 'resolution' && (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              )}
                              {notification.type === 'confirmation' && (
                                <Info className="w-5 h-5 text-indigo-500" />
                              )}
                              {notification.type === 'feedback' && (
                                <ThumbsUp className="w-5 h-5 text-purple-500" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-800">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{formatTimestamp(notification.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 bg-gray-50 text-center">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">{userInfo?.name?.charAt(0) || 'A'}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{userInfo?.name || 'Admin'}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              
              {showMobileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="p-3 border-b">
                    <p className="font-medium text-gray-800">{userInfo?.name}</p>
                    <p className="text-xs text-gray-500">{userInfo?.email}</p>
                  </div>
                  <div>
                    <button 
                      onClick={() => setCurrentView('citizen')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      <span>Citizen View</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                      <UserCog className="w-4 h-4 text-gray-500" />
                      <span>Profile</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                      <Settings className="w-4 h-4 text-gray-500" />
                      <span>Settings</span>
                    </button>
                    <div className="border-t">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">Live System</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-3xl font-bold text-gray-800">{issues.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Issues</p>
                <p className="text-3xl font-bold text-yellow-600">{issues.filter(i => i.status === 'in-progress').length}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-green-600">{issues.filter(i => i.status === 'resolved').length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Rate</p>
                <p className="text-3xl font-bold text-indigo-600">94%</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Government Departments Section */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>Government Departments & Performance</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">Real-time performance tracking of responsible departments</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {governmentDepartments.map((dept, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-lg">{dept.name}</h4>
                      <p className="text-sm text-indigo-600 font-medium mt-1">{dept.head}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{dept.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{dept.contact}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-700 font-medium">Active</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{dept.responsibilities}</p>
                  
                  <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{dept.performance.resolved}</div>
                      <div className="text-xs text-gray-600">Resolved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-600">{dept.performance.pending}</div>
                      <div className="text-xs text-gray-600">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{dept.performance.avgTime}</div>
                      <div className="text-xs text-gray-600">Avg Time</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Performance Rating:</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(dept.rating)}
                      <span className="text-xs text-gray-600 ml-2">{dept.rating}/5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Government Verification Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Government of Jharkhand - Verified System</h3>
              <p className="text-indigo-100">Department of Higher and Technical Education</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">System Authorization</h4>
              <p className="text-sm text-indigo-100">Authorized by Chief Secretary, Jharkhand</p>
              <p className="text-xs text-indigo-200 mt-1">Ref: CS/DHTE/2024/156</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Data Security</h4>
              <p className="text-sm text-indigo-100">ISO 27001 Certified Infrastructure</p>
              <p className="text-xs text-indigo-200 mt-1">NIC Data Center Compliance</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Legal Framework</h4>
              <p className="text-sm text-indigo-100">Right to Information Act, 2005</p>
              <p className="text-xs text-indigo-200 mt-1">Citizen Charter Compliant</p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-white border-opacity-20">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span>System ID: JH-CIVIC-2024-001</span>
                <span>•</span>
                <span>Last Audit: June 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Verified by:</span>
                <span className="font-semibold">NIC Jharkhand</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Reports vs Resolutions</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="reports" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Issue Categories</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.categories}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {analyticsData.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Issue Management</h3>
            <div className="flex items-center space-x-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Categories</option>
                {issueCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="p-6">
            {filteredIssues.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg mb-2">No issues found</p>
                <p>Try adjusting your filters or wait for new reports</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredIssues.map((issue) => {
                  const category = issueCategories.find(cat => cat.id === issue.category);
                  return (
                    <div key={issue.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${category?.color || 'bg-gray-500'}`}>
                            {category && React.createElement(category.icon, { className: "w-5 h-5 text-white" })}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{category?.name || 'Unknown'}</h4>
                            <p className="text-sm text-gray-600">ID: #{issue.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                            {issue.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                            {issue.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{issue.description}</p>

                      {issue.photo && (
                        <div className="mb-3">
                          <img 
                            src={issue.photo} 
                            alt="Issue photo" 
                            className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => setSelectedIssue(issue)}
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{issue.location}</span>
                          </span>
                          <span>Reported: {new Date(issue.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-blue-800">Assigned Department:</p>
                            <p className="text-sm text-blue-600">{issue.assignedTo}</p>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-blue-500">
                              <span className="flex items-center space-x-1">
                                <Phone className="w-3 h-3" />
                                <span>{issue.assignedContact}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Mail className="w-3 h-3" />
                                <span>{issue.assignedEmail}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {issue.status === 'new' && (
                            <button
                              onClick={() => updateIssueStatus(issue.id, 'in-progress')}
                              className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                            >
                              Start Work
                            </button>
                          )}
                          {issue.status === 'in-progress' && (
                            <button
                              onClick={() => updateIssueStatus(issue.id, 'resolved')}
                              className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                            >
                              Mark Resolved
                            </button>
                          )}
                          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                            Add Comment
                          </button>
                          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                            Assign
                          </button>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          <div>Last Updated: {new Date(issue.updatedAt).toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex justify-between items-center">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Previous
              </button>
              <div className="flex items-center space-x-1">
                <button className="w-8 h-8 bg-indigo-600 text-white rounded-lg">1</button>
                <button className="w-8 h-8 text-gray-700 hover:bg-gray-100 rounded-lg">2</button>
                <button className="w-8 h-8 text-gray-700 hover:bg-gray-100 rounded-lg">3</button>
                <span className="text-gray-500">...</span>
                <button className="w-8 h-8 text-gray-700 hover:bg-gray-100 rounded-lg">12</button>
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedIssue && selectedIssue.photo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedIssue(null)}
        >
          <div className="bg-white rounded-lg p-4 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Issue Photo</h3>
              <button 
                onClick={() => setSelectedIssue(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <img 
              src={selectedIssue.photo} 
              alt="Issue detail" 
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Category:</strong> {issueCategories.find(cat => cat.id === selectedIssue.category)?.name}</p>
              <p><strong>Description:</strong> {selectedIssue.description}</p>
              <p><strong>Location:</strong> {selectedIssue.location}</p>
              <p><strong>Assigned to:</strong> {selectedIssue.assignedTo}</p>
              <p><strong>Contact:</strong> {selectedIssue.assignedContact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CivicReportingSystem;