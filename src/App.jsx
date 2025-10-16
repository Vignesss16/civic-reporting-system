


import supabase from './lib/supabaseClient';
// Add these imports to your existing imports in App.jsx
import Login from './components/Login';
// (This is TEMPORARY - remove this in production!)
import CreateAdmin from './components/CreateAdmin';
import Notifications from './components/Notifications';
import SettingsForm from './components/Settings';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Camera, MapPin, Send, AlertCircle, CheckCircle, Clock, Filter,
  Settings, BarChart3, Users, Zap, Home, User, Search, Bell, Eye,
  Trash2, Lightbulb, Construction, Trees, Phone, Mail, Shield,
  LogIn, UserPlus, Lock, ArrowRight, LogOut, MapPinned, MessageCircle,
  ThumbsUp, Calendar, UserCog, FileText, ChevronDown, X, Menu,
  Map, List, Info, Heart, HelpCircle, Award, ThumbsDown, 
  ClipboardCheck, Navigation, UserCheck, Edit3, ZoomIn, CheckSquare,
  Star, Globe, Smartphone, Activity, TrendingUp, Users2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const CivicReportingSystem = () => {
  const [currentView, setCurrentView] = useState('homepage'); // Start with homepage
  const [showSettingsForm, setShowSettingsForm] = useState(false);
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
  const [viewingImage, setViewingImage] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [fieldWorkerNotes, setFieldWorkerNotes] = useState('');
  const [verificationPhoto, setVerificationPhoto] = useState(null);
  const fileInputRef = useRef(null);
  const verificationFileInputRef = useRef(null);

  // Field worker specific states
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [verificationData, setVerificationData] = useState({
    status: '',
    notes: '',
    photo: null,
    estimatedResolutionTime: ''
  });

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
      email: 'pwd.roads@Maharashtra.gov.in'
    },
    { 
      id: 'streetlight', 
      name: 'Streetlight', 
      icon: Lightbulb, 
      color: 'bg-yellow-500', 
      department: 'JUSNL (Maharashtra Urban Services)', 
      contact: '+91-651-2491234',
      email: 'streetlight@jusnl.Maharashtra.gov.in'
    },
    { 
      id: 'garbage', 
      name: 'Garbage', 
      icon: Trash2, 
      color: 'bg-green-500', 
      department: 'Urban Development Dept.', 
      contact: '+91-651-2480456',
      email: 'sanitation@urban.Maharashtra.gov.in'
    },
    { 
      id: 'water', 
      name: 'Water Issue', 
      icon: AlertCircle, 
      color: 'bg-blue-500', 
      department: 'PHED (Public Health Engineering)', 
      contact: '+91-651-2491567',
      email: 'water@phed.Maharashtra.gov.in'
    },
    { 
      id: 'tree', 
      name: 'Tree/Park', 
      icon: Trees, 
      color: 'bg-emerald-500', 
      department: 'Forest & Environment Dept.', 
      contact: '+91-651-2446789',
      email: 'parks@forest.Maharashtra.gov.in'
    },
    { 
      id: 'other', 
      name: 'Other', 
      icon: AlertCircle, 
      color: 'bg-gray-500', 
      department: 'Municipal Corporation', 
      contact: '+91-651-2446123',
      email: 'grievance@Mumbai.municipal.gov.in'
    }
  ];

  const governmentDepartments = [
    {
      name: 'Public Works Department (PWD)',
      head: 'Shri Rajesh Kumar Singh, Chief Engineer',
      responsibilities: 'Road construction, maintenance, bridges, government buildings',
      performance: { resolved: 156, pending: 23, avgTime: '4.2 days' },
      contact: 'pwd.Maharashtra@gov.in',
      phone: '+91-651-2446688',
      rating: 4.6
    },
    {
      name: 'Maharashtra Urban Services (JUSNL)',
      head: 'Smt. Priya Sharma, Managing Director',
      responsibilities: 'Street lighting, urban infrastructure, electricity distribution',
      performance: { resolved: 89, pending: 12, avgTime: '2.8 days' },
      contact: 'md.jusnl@Maharashtra.gov.in',
      phone: '+91-651-2491234',
      rating: 4.8
    },
    {
      name: 'Urban Development Department',
      head: 'Shri Anil Kumar Pandey, Secretary',
      responsibilities: 'Waste management, urban planning, sanitation',
      performance: { resolved: 134, pending: 18, avgTime: '3.5 days' },
      contact: 'secy.urban@Maharashtra.gov.in',
      phone: '+91-651-2480456',
      rating: 4.4
    },
    {
      name: 'Public Health Engineering Dept.',
      head: 'Dr. Sunita Devi, Chief Engineer',
      responsibilities: 'Water supply, drainage, sewerage systems',
      performance: { resolved: 67, pending: 8, avgTime: '5.1 days' },
      contact: 'ce.phed@Maharashtra.gov.in',
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

  // Authentication guard function
  const requireAuth = (action) => {
    if (!userInfo) {
      setCurrentView('login');
      return false;
    }
    return true;
  };

  // Role-based access control
  const hasRole = (requiredRole) => {
    if (!userInfo) return false;
    if (requiredRole === 'citizen') return true; // All logged-in users can access citizen features
    return userInfo.role === requiredRole;
  };


































  











  // Fetch issues for field workers
  const fetchFieldWorkerIssues = useCallback(async () => {
    if (userInfo?.role !== 'fieldworker') return;
    
    try {
      const { data, error } = await supabase
        .from('issues')
        .select(`
          *,
          profiles:user_id (name),
          departments:department_id (name, phone, email)
        `)
        .eq('assigned_to', userInfo.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
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
          userId: issue.user_id,
          verificationNotes: issue.verification_notes,
          verificationPhoto: issue.verification_photo_url,
          verifiedAt: issue.verified_at,
          verifiedBy: issue.verified_by
        }));
        
        setAssignedIssues(transformedIssues);
      }
    } catch (error) {
      console.error('Error fetching field worker issues:', error);
    }
  }, [userInfo]);

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
          userId: issue.user_id,
          verificationNotes: issue.verification_notes,
          verificationPhoto: issue.verification_photo_url,
          verifiedAt: issue.verified_at,
          verifiedBy: issue.verified_by
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
                address: 'Maharashtra'
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
              address: 'Maharashtra',
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
              address: profile.address || 'Maharashtra',
              joinedOn: profile.created_at ? new Date(profile.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            });
          }
          
          // Don't auto-redirect if user is authenticated - let them see homepage
          console.log("User logged in, staying on current view");
        } else {
          console.log("No session found");
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
    if (userInfo?.role === 'fieldworker') {
      fetchFieldWorkerIssues();
    }

    const issuesSubscription = supabase
      .channel('public:issues')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'issues' }, () => {
        fetchIssues();
        if (userInfo?.role === 'fieldworker') {
          fetchFieldWorkerIssues();
        }
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(issuesSubscription);
    };
  }, [fetchIssues, fetchFieldWorkerIssues, userInfo?.role]);

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

  const handleVerificationPhotoCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVerificationData(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const submitReport = async () => {
    if (!requireAuth()) return;
    
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

  const submitVerification = async (issueId) => {
    if (!verificationData.status || !verificationData.notes) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      let verificationPhotoUrl = null;
      if (verificationData.photo) {
        const fileName = `verification-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.jpg`;
        
        const base64Data = verificationData.photo.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArrays.push(byteCharacters.charCodeAt(i));
        }
        
        const byteArray = new Uint8Array(byteArrays);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        const file = new File([blob], fileName, { type: 'image/jpeg' });
        
        const { data, error } = await supabase.storage
          .from('issue-photos')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (error) throw error;
        
        const { data: urlData } = supabase.storage
          .from('issue-photos')
          .getPublicUrl(fileName);
          
        verificationPhotoUrl = urlData.publicUrl;
      }
      
      const { error } = await supabase
        .from('issues')
        .update({
          status: verificationData.status,
          verification_notes: verificationData.notes,
          verification_photo_url: verificationPhotoUrl,
          verified_at: new Date().toISOString(),
          verified_by: userInfo.id,
          estimated_resolution_time: verificationData.estimatedResolutionTime,
          updated_at: new Date().toISOString()
        })
        .eq('id', issueId);
      
      if (error) throw error;
      
      // Create notification for citizen
      const { data: issueData } = await supabase
        .from('issues')
        .select('user_id, category')
        .eq('id', issueId)
        .single();
      
      if (issueData?.user_id) {
        await supabase
          .from('notifications')
          .insert([
            {
              user_id: issueData.user_id,
              issue_id: issueId,
              type: 'verification',
              message: `Your ${issueData.category} report has been verified by field worker`,
              read: false,
              created_at: new Date().toISOString()
            }
          ]);
      }
      
      setShowVerificationForm(false);
      setSelectedIssue(null);
      setVerificationData({
        status: '',
        notes: '',
        photo: null,
        estimatedResolutionTime: ''
      });
      
      alert("Verification submitted successfully!");
      fetchFieldWorkerIssues();
      
    } catch (error) {
      console.error("Error submitting verification:", error);
      alert(`Failed to submit verification: ${error.message}`);
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
              address: userMeta.address || 'Maharashtra'
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
          address: userMeta.address || 'Maharashtra',
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
      
      // Navigate based on role - but only show citizen view to non-admin/field-worker users
      if (userRole === 'admin') {
        setCurrentView('admin');
      } else if (userRole === 'fieldworker') {
        setCurrentView('fieldworker');
      } else {
        setCurrentView('citizen');
      }
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
            address: 'Maharashtra'
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
        address: 'Maharashtra',
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
      setCurrentView('homepage');
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
      case 'verified': return <CheckSquare className="w-4 h-4 text-blue-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'verified': return 'bg-blue-100 text-blue-800';
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

  // HOMEPAGE VIEW
  if (currentView === 'homepage') {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation Header */}
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-orange-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">CitizenReport</h1>
                  <p className="text-xs text-gray-600">Government of Maharashtra</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <button onClick={() => setCurrentView('homepage')} className="text-gray-900 hover:text-orange-600 font-medium">Home</button>
                <button className="text-gray-600 hover:text-orange-600">About</button>
                <button className="text-gray-600 hover:text-orange-600">Services</button>
                <button className="text-gray-600 hover:text-orange-600">Contact</button>
              </div>

              <div className="flex items-center space-x-4">
                {userInfo ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-700">Welcome, {userInfo.name}</span>
                    <button
                      onClick={() => {
                        if (userInfo.role === 'admin') setCurrentView('admin');
                        else if (userInfo.role === 'fieldworker') setCurrentView('fieldworker');
                        else setCurrentView('citizen');
                      }}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setCurrentView('login')}
                      className="text-orange-600 hover:text-orange-800 font-medium"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setCurrentView('register')}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        {/* <section className="bg-gradient-to-br from-orange-50 via-indigo-50 to-red-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Make Your City
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"> Better</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Report civic issues directly to the government and track their resolution in real-time. 
                  Your voice matters in building a better Maharashtra.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      if (userInfo) {
                        setCurrentView('citizen');
                        setShowReportForm(true);
                      } else {
                        setCurrentView('login');
                      }
                    }}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 text-lg"
                  >
                    <Camera className="w-6 h-6" />
                    <span>Report Issue</span>
                  </button>
                  <button
                    onClick={() => {
                      if (userInfo) {
                        setCurrentView('citizen');
                      } else {
                        setCurrentView('login');
                      }
                    }}
                    className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 flex items-center justify-center space-x-2 text-lg"
                  >
                    <Eye className="w-6 h-6" />
                    <span>View Reports</span>
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Government Verified</h3>
                      <p className="text-sm text-gray-600">Official Maharashtra Portal</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800">1,247 Issues Resolved</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-yellow-800">89 In Progress</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-800">5,432 Active Citizens</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}



        <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #fff7ed, #fef3c7, #ffffff)' }}>
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Make Your City
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #ea580c, #dc2626)', WebkitBackgroundClip: 'text' }}> Better</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Report civic issues directly to the government and track their resolution in real-time. 
                  Your voice matters in building a better Maharashtra.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      if (userInfo) {
                        setCurrentView('citizen');
                        setShowReportForm(true);
                      } else {
                        setCurrentView('login');
                      }
                    }}
                    className="relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transform transition-all duration-300 hover:scale-105 active:scale-95 animate-gradient"
                    style={{ background: 'linear-gradient(to right, #ea580c, #dc2626)' }}
                  >
                    <style jsx>{`
                      @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                      }
                      .animate-gradient {
                        background: linear-gradient(270deg, #ff6b35, #f7931e, #ff6b35);
                        background-size: 200% 200%;
                        animation: gradient 3s ease infinite;
                      }
                    `}</style>




                    
                    {/* Glass overlay on hover */}
                    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
  
                    {/* Button content */}
                    <span className="relative flex items-center justify-center space-x-2">
                      <Camera className="w-6 h-6" />
                      <span>Report Issue</span>
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      if (userInfo) {
                        setCurrentView('citizen');
                      } else {
                        setCurrentView('login');
                      }
                    }}
                    className="relative overflow-hidden bg-white text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center justify-center space-x-2">
                      <Eye className="w-6 h-6" />
                      <span>View Reports</span>
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Government Verified</h3>
                      <p className="text-sm text-gray-600">Official Maharashtra Portal</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50/80 backdrop-blur-sm rounded-lg border border-green-100/50">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800">1,247 Issues Resolved</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-50/80 backdrop-blur-sm rounded-lg border border-amber-100/50">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-amber-600" />
                        <span className="font-medium text-amber-800">89 In Progress</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50/80 backdrop-blur-sm rounded-lg border border-blue-100/50">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-800">5,432 Active Citizens</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>






        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How CitizenReport Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A simple, transparent process that connects citizens directly with government departments 
                for faster issue resolution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Report Issue</h3>
                <p className="text-gray-600 leading-relaxed">
                  Take a photo, describe the problem, and submit your report. Our system automatically 
                  assigns it to the right department.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Verification</h3>
                <p className="text-gray-600 leading-relaxed">
                  Field workers verify the issue on-site and provide updates on the resolution progress 
                  with photos and status updates.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Resolution</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track the entire process from start to finish. Get notified when your issue is resolved 
                  and provide feedback on the service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Making a Real Impact
              </h2>
                            <p className="text-xl text-gray-600">
                See how CitizenReport is transforming civic engagement in Maharashtra
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">1,247</div>
                <div className="text-gray-600">Issues Resolved</div>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">3.2</div>
                <div className="text-gray-600">Avg. Resolution Days</div>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">5,432</div>
                <div className="text-gray-600">Active Citizens</div>
              </div>
            </div>
          </div>
        </section>

        
        {/* Departments Section */}
        <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-white relative overflow-hidden">
          {/* Decorative elements for background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4">
                Government Departments
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connected with key departments for faster resolution of civic issues across Maharashtra
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issueCategories.map((category, index) => (
                <div 
                  key={index} 
                  className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group hover:bg-white/90 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      {React.createElement(category.icon, { className: "w-7 h-7 text-white" })}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-700 mb-3">{category.department}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4 text-orange-600" />
                          <p className="text-xs">{category.contact}</p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4 text-orange-600" />
                          <p className="text-xs">{category.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200/50">
                    <button className="text-sm text-orange-600 font-medium flex items-center gap-1 hover:text-orange-700 transition-colors group-hover:translate-x-1 duration-300">
                      View Issues
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 orange-red-gradient">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Join thousands of citizens who are actively improving their communities through CitizenReport.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  if (userInfo) {
                    setCurrentView('citizen');
                    setShowReportForm(true);
                  } else {
                    setCurrentView('register');
                  }
                }}
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-6 h-6" />
                <span>Get Started Today</span>
              </button>
              <button
                onClick={() => setCurrentView('login')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-colors flex items-center justify-center space-x-2"
              >
                <LogIn className="w-6 h-6" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-8 h-8 text-orange-400" />
                  <div>
                    <h3 className="text-xl font-bold">CitizenReport</h3>
                    <p className="text-gray-400">Government of Maharashtra</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 max-w-md">
                  An official government platform for civic issue reporting and resolution, 
                  connecting citizens directly with responsible departments.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>Verified Government Portal</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><button className="hover:text-white transition-colors">How it Works</button></li>
                  <li><button className="hover:text-white transition-colors">Departments</button></li>
                  <li><button className="hover:text-white transition-colors">Help Center</button></li>
                  <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>+91-651-2400001</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>support@CitizenReport.Maharashtra.gov.in</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Mumbai, Maharashtra</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Government of Maharashtra. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // LOGIN VIEW
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-100 flex flex-col">
        <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentView('homepage')}
              className="flex items-center space-x-2"
            >
              <Shield className="w-8 h-8 text-orange-600" />
              <div>
                <h1 className="text-xl font-bold text-orange-600">CitizenReport</h1>
                <p className="text-xs text-gray-600">Government of Maharashtra</p>
              </div>
            </button>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setCurrentView('register')}
                className="px-4 py-2 text-orange-600 hover:text-orange-800 font-medium"
              >
                Register
              </button>
              <button
                onClick={() => setCurrentView('login')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
              >
                Login
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Login onLoginSuccess={(userInfo) => {
              setUserInfo(userInfo);
              
              // Navigate based on role
              if (userInfo.role === 'admin') {
                setCurrentView('admin');
              } else if (userInfo.role === 'fieldworker') {
                setCurrentView('fieldworker');
              } else {
                setCurrentView('citizen');
              }
            }} />
          </div>
        </div>
      </div>
    );
  }






    // REGISTER VIEW
  if (currentView === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-100 flex flex-col">
        <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentView('homepage')}
              className="flex items-center space-x-2"
            >
              <Shield className="w-8 h-8 text-orange-600" />
              <div>
                <h1 className="text-xl font-bold text-orange-600">CitizenReport</h1>
                <p className="text-xs text-gray-600">Government of Maharashtra</p>
              </div>
            </button>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setCurrentView('register')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
              >
                Register
              </button>
              <button
                onClick={() => setCurrentView('login')}
                className="px-4 py-2 text-orange-600 hover:text-orange-800 font-medium"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2 mt-6"
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
                      className="text-orange-600 hover:text-orange-800 font-medium"
                    >
                      Login Instead
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FIELD WORKER VIEW
  if (currentView === 'fieldworker') {
    if (!hasRole('fieldworker')) {
      setCurrentView('citizen');
      return null;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-100">
        <div className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-7 h-7 text-orange-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Field Worker Dashboard</h1>
                <p className="text-sm text-gray-600">Government of Maharashtra</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentView('homepage')}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-1"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <div className="relative">
                <Notifications />
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-medium">{userInfo?.name?.charAt(0) || 'F'}</span>
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-gray-700">{userInfo?.name || 'Field Worker'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {showMobileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="p-3 border-b">
                      <p className="font-medium text-gray-800">{userInfo?.name}</p>
                      <p className="text-xs text-gray-500">{userInfo?.email}</p>
                      <p className="text-xs text-green-600">{userInfo?.department || 'Field Operations'}</p>
                    </div>
                    <div>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Profile</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-gray-500" />
                        <span>My Activity</span>
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
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 space-y-6">
          {/* Field Worker Stats */}
          <div className="green-emerald-gradient rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Field Operations Portal</h2>
            <p className="text-green-100 mb-4">Verify and update issue reports in your assigned area</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{issues.filter(i => i.status === 'new').length}</div>
                <div className="text-sm text-green-100">New Issues</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{issues.filter(i => i.status === 'verified').length}</div>
                <div className="text-sm text-green-100">Verified</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{issues.filter(i => i.status === 'in-progress').length}</div>
                <div className="text-sm text-green-100">In Progress</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{issues.filter(i => i.status === 'resolved').length}</div>
                <div className="text-sm text-green-100">Completed</div>
              </div>
            </div>
          </div>
        {/* </div> */}
        
          {/* Available Issues for Verification */}
          <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-4 border-b border-white/30 bg-gradient-to-r from-green-50/80 to-emerald-50/80">
              <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                <ClipboardCheck className="w-5 h-5 text-green-600" />
                <span>Issues Requiring Verification</span>
              </h3>
            </div>
            
            <div className="p-4">
              {issues.filter(i => i.status === 'new').length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white/40 rounded-lg">
                  <ClipboardCheck className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium">No new issues to verify</p>
                  <p className="text-sm mt-2">Check back later for new reports</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {issues.filter(i => i.status === 'new').map((issue) => {
                    const category = issueCategories.find(cat => cat.id === issue.category);
                    return (
                      <div key={issue.id} className="group bg-white/70 backdrop-blur-md border border-white/50 rounded-lg p-4 shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-white/90 transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${category?.color || 'bg-gray-500'} group-hover:scale-110 transition-transform duration-300`}>
                              {category && React.createElement(category.icon, { className: "w-5 h-5 text-white" })}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">{issue.description}</h4>
                              <div className="flex items-center space-x-2 mt-1.5">
                                <span className="text-sm text-gray-600">Reported by: {issue.reporter}</span>
                                <span className="text-xs text-gray-500">• {new Date(issue.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-2 mt-1.5">
                                <MapPin className="w-4 h-4 text-orange-500" />
                                <span className="text-sm text-gray-600">{issue.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className={`px-3 py-1.5 rounded-full text-xs font-medium bg-amber-100/80 text-amber-800 border border-amber-200/50 shadow-sm`}>
                            New Report
                          </div>
                        </div>
                        
                        {/* Improved Image Display */}
                        {issue.photo && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Citizen's Photo:</p>
                            <div className="relative group">
                              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100 border border-gray-200/70 shadow-inner">
                                <img 
                                  src={issue.photo} 
                                  alt="Issue photo" 
                                  className="w-full h-full object-contain hover:object-cover transition-all duration-500"
                                  loading="lazy"
                                />
                              </div>
                              
                              {/* Image Expand Button */}
                              <button 
                                onClick={() => window.open(issue.photo, '_blank')}
                                className="absolute bottom-3 right-3 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                              >
                                <ZoomIn className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200/50">
                          <div className="flex items-center space-x-2">
                            {/* Navigate Button */}
                            <button
                              onClick={() => {
                                const coords = issue.location.split(',');
                                if (coords.length === 2) {
                                  const url = `https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}`;
                                  window.open(url, '_blank');
                                }
                              }}
                              className="relative overflow-hidden bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-700 px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-blue-500/20 shadow-sm hover:shadow group"
                            >
                              <span className="flex items-center space-x-1">
                                <Navigation className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                                <span className="text-sm">Navigate</span>
                              </span>
                            </button>
                            
                            {/* Verify Button */}
                            <button
                              onClick={() => {
                                setSelectedIssue(issue);
                                setShowVerificationForm(true);
                              }}
                              className="relative overflow-hidden bg-gradient-to-r from-green-500/80 to-emerald-500/80 text-white px-3 py-1.5 rounded-lg transition-all duration-300 hover:from-green-600/90 hover:to-emerald-600/90 shadow-sm hover:shadow group"
                            >
                              <span className="flex items-center space-x-1">
                                <UserCheck className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                                <span className="text-sm">Verify & Update</span>
                              </span>
                            </button>
                          </div>
                          
                          {/* Priority Badge */}
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)} shadow-sm border border-white/30`}>
                            {issue.priority} priority
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* In Progress Issues */}
          <>
          <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-4 border-b border-white/30" style={{ background: 'linear-gradient(to right, rgba(251, 191, 36, 0.8), rgba(245, 158, 11, 0.8))' }}>
              <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span>Work in Progress</span>
              </h3>
            </div>
            
            <div className="p-4">
              {issues.filter(i => i.status === 'in-progress' || i.status === 'verified').length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white/40 rounded-lg">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium">No work in progress</p>
                  <p className="text-sm mt-2">Check back later</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {issues.filter(i => i.status === 'in-progress' || i.status === 'verified').map((issue) => {
                    const category = issueCategories.find(cat => cat.id === issue.category);
                    return (
                      <div key={issue.id} className="group bg-white/70 backdrop-blur-md border border-white/50 rounded-xl p-5 shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-white/90 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2.5 rounded-lg ${category?.color || 'bg-gray-500'} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                              {category && React.createElement(category.icon, { className: "w-5 h-5 text-white" })}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">{issue.description}</h4>
                              <div className="flex items-center space-x-2 mt-1.5">
                                <span className="text-sm text-gray-600">Reported by: {issue.reporter}</span>
                                <span className="text-xs text-gray-500">• {new Date(issue.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-2 mt-1.5">
                                <MapPin className="w-4 h-4 text-orange-500" />
                                <span className="text-sm text-gray-600">{issue.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                            issue.status === 'verified' 
                              ? 'bg-blue-100/80 text-blue-800 border border-blue-200/50' 
                              : 'bg-yellow-100/80 text-yellow-800 border border-yellow-200/50'
                          } shadow-sm`}>
                            {issue.status === 'verified' ? 'Verified' : 'In Progress'}
                          </div>
                        </div>
                        
                        {/* Photos Section - Responsive Layout */}
                        <div className="mb-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Citizen's Photo */}
                            {issue.photo && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Before (Citizen's Photo):</p>
                                <div 
                                  className="relative group/image cursor-pointer rounded-lg overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                                  onClick={() => setViewingImage(issue.photo)}
                                >
                                  <div className="aspect-w-16 aspect-h-12">
                                    <img 
                                      src={issue.photo} 
                                      alt="Before" 
                                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                      loading="lazy"
                                      style={{ height: '200px' }}
                                    />
                                  </div>
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity">
                                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm p-1.5 rounded-md text-white">
                                      <ZoomIn className="w-4 h-4" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Field Worker's Photo */}
                            {issue.verificationPhoto && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Current Status (Field Photo):</p>
                                <div 
                                  className="relative group/image cursor-pointer rounded-lg overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                                  onClick={() => setViewingImage(issue.verificationPhoto)}
                                >
                                  <div className="aspect-w-16 aspect-h-12">
                                    <img 
                                      src={issue.verificationPhoto} 
                                      alt="Current status" 
                                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                      loading="lazy"
                                      style={{ height: '200px' }}
                                    />
                                  </div>
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity">
                                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm p-1.5 rounded-md text-white">
                                      <ZoomIn className="w-4 h-4" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Field Notes */}
                        {issue.verificationNotes && (
                          <div className="bg-white/50 backdrop-blur-sm border border-white/50 rounded-lg p-4 mb-4 shadow-inner">
                            <p className="text-sm font-medium text-gray-700">Field Notes:</p>
                            <p className="text-sm text-gray-600 mt-1">{issue.verificationNotes}</p>
                            {issue.verifiedAt && (
                              <p className="text-xs text-gray-500 mt-2">Verified on {new Date(issue.verifiedAt).toLocaleDateString()}</p>
                            )}
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 border-t border-white/30 gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedIssue(issue);
                                setShowVerificationForm(true);
                              }}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 text-amber-700 rounded-lg hover:bg-amber-500/20 transition-all duration-300 shadow-sm hover:shadow group/btn"
                            >
                              <Edit3 className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                              <span className="text-sm">Update Status</span>
                            </button>
                            <button
                              onClick={() => updateIssueStatus(issue.id, 'resolved')}
                              className="flex items-center space-x-1 px-3 py-1.5 text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow group/btn"
                              style={{ background: 'linear-gradient(to right, rgba(34, 197, 94, 0.8), rgba(5, 150, 105, 0.8))' }}
                            >
                              <CheckCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                              <span className="text-sm">Mark Resolved</span>
                            </button>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)} border border-white/30 shadow-sm`}>
                            {issue.priority} priority
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* In-place Image Viewer Modal */}
          {viewingImage && (
            <div 
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setViewingImage(null)}
            >
              <div 
                className="relative max-w-4xl max-h-[90vh] overflow-hidden" 
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={viewingImage} 
                  alt="Enlarged view" 
                  className="max-w-full max-h-[90vh] object-contain mx-auto"
                />
                <button 
                  className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
                  onClick={() => setViewingImage(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </>   


          {/* Verification Form Modal */}
          {showVerificationForm && selectedIssue && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Verify & Update Issue</h2>
                    <button 
                      onClick={() => {
                        setShowVerificationForm(false);
                        setSelectedIssue(null);
                        setVerificationData({
                          status: '',
                          notes: '',
                          photo: null,
                          estimatedResolutionTime: ''
                        });
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Issue Details */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-gray-800 mb-2">Issue Details</h3>
                    <p className="text-sm text-gray-600 mb-2">{selectedIssue.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Category: {issueCategories.find(cat => cat.id === selectedIssue.category)?.name}</span>
                      <span>Priority: {selectedIssue.priority}</span>
                      <span>Reported: {new Date(selectedIssue.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Show citizen's photo */}
                  {selectedIssue.photo && (
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-800 mb-2">Citizen's Photo</h3>
                      <img 
                        src={selectedIssue.photo} 
                        alt="Citizen's report" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Issue Status *</label>
                      <select
                        value={verificationData.status}
                        onChange={(e) => setVerificationData(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      >
                        <option value="">Select status</option>
                        <option value="verified">Verified - Issue exists as reported</option>
                        <option value="in-progress">In Progress - Work has started</option>
                        <option value="resolved">Resolved - Issue has been fixed</option>
                        <option value="invalid">Invalid - Issue not found/false report</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Field Notes *</label>
                      <textarea
                        value={verificationData.notes}
                        onChange={(e) => setVerificationData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Describe the current condition, work done, materials used, etc."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                        rows="4"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Resolution Time</label>
                      <select
                        value={verificationData.estimatedResolutionTime}
                        onChange={(e) => setVerificationData(prev => ({ ...prev, estimatedResolutionTime: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select timeframe</option>
                        <option value="Immediate">Immediate (Already resolved)</option>
                        <option value="1-2 days">1-2 days</option>
                        <option value="3-5 days">3-5 days</option>
                        <option value="1-2 weeks">1-2 weeks</option>
                        <option value="2-4 weeks">2-4 weeks</option>
                        <option value="1-2 months">1-2 months</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Field Verification Photo *</label>
                      <p className="text-xs text-gray-500 mb-2">Take a photo showing the current status of the issue</p>
                      <div className="space-y-3">
                        <input
                          type="file"
                          ref={verificationFileInputRef}
                          onChange={handleVerificationPhotoCapture}
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                        />
                        <button
                          onClick={() => verificationFileInputRef.current?.click()}
                          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 transition-colors flex flex-col items-center space-y-2"
                        >
                          <Camera className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-600">Capture verification photo</span>
                        </button>
                        {verificationData.photo && (
                          <div className="relative">
                            <img 
                              src={verificationData.photo} 
                              alt="Verification photo" 
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => setVerificationData(prev => ({ ...prev, photo: null }))}
                              className="absolute top-2 right-2 p-1.5 bg-red-500/80 backdrop-blur-sm text-white rounded-full hover:bg-red-600/90 transition-all duration-300 border border-white/20 shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => submitVerification(selectedIssue.id)}
                      disabled={!verificationData.status || !verificationData.notes || !verificationData.photo}
                      className="relative overflow-hidden w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg group disabled:opacity-70 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0"></span>
                      <span className="relative flex items-center justify-center space-x-2">
                        <CheckSquare className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        <span>Submit Verification</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ADMIN VIEW
  if (currentView === 'admin') {
    if (!hasRole('admin')) {
      setCurrentView('citizen');
      return null;
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-7 h-7 text-orange-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Civic Issue Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('homepage')}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-1"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-medium">{userInfo?.name?.charAt(0) || 'A'}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{userInfo?.name || 'Admin'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {showMobileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="p-3 border-b">
                      <p className="font-medium text-gray-800">{userInfo?.name}</p>
                      <p className="text-xs text-gray-500">{userInfo?.email}</p>
                      <p className="text-xs text-orange-600">Administrator</p>
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
                        <span>User Management</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span>System Settings</span>
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
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-white/90 to-orange-50/90 backdrop-blur-md border border-orange-100/30 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Reports</p>
                  <p className="text-3xl font-bold text-orange-600">{issues.length}</p>
                  <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                </div>
                <div className="p-3 bg-orange-100/80 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/90 to-red-100 backdrop-blur-md border border-orange-100/30 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Issues</p>
                  <p className="text-3xl font-bold text-red-600">{issues.filter(i => i.status === 'in-progress').length}</p>
                  <p className="text-xs text-gray-600 mt-1">Being worked on</p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/90 to-green-50/90 backdrop-blur-md border border-orange-100/30 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold text-green-600">{issues.filter(i => i.status === 'resolved').length}</p>
                  <p className="text-xs text-gray-600 mt-1">This month</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-md border border-orange-100/30 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Response Rate</p>
                  <p className="text-3xl font-bold text-blue-600">94%</p>
                  <p className="text-xs text-green-600 mt-1">↑ 3% improvement</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Reports vs Resolutions Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="reports" stroke="#3b82f6" strokeWidth={2} name="Reports" />
                    <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} name="Resolved" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Issue Categories Distribution</h3>
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

          {/* Department Performance */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <Users className="w-5 h-5 text-orange-600" />
                <span>Department Performance Overview</span>
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Assigned</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Resolved</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Pending</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Avg. Time</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {governmentDepartments.map((dept, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-800">{dept.name}</p>
                            <p className="text-sm text-gray-600">{dept.head}</p>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="font-medium">{dept.performance.resolved + dept.performance.pending}</span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="text-green-600 font-medium">{dept.performance.resolved}</span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="text-yellow-600 font-medium">{dept.performance.pending}</span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="text-blue-600">{dept.performance.avgTime}</span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center">
                            {renderStars(dept.rating)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Issue Management with Photo Comparison */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
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
                  <option value="verified">Verified</option>
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
                  <p>Try adjusting your filters</p>
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

                        {/* Photo Comparison Section */}
                        {(issue.photo || issue.verificationPhoto) && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            {issue.photo && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Citizen's Photo (Before):</p>
                                <img 
                                  src={issue.photo} 
                                  alt="Before" 
                                  className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90"
                                  onClick={() => window.open(issue.photo, '_blank')}
                                />
                              </div>
                            )}
                            {issue.verificationPhoto && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Field Worker's Photo (After):</p>
                                <img 
                                  src={issue.verificationPhoto} 
                                  alt="After" 
                                  className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90"
                                  onClick={() => window.open(issue.verificationPhoto, '_blank')}
                                />
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{issue.location}</span>
                            </span>
                            <span>Reported: {new Date(issue.createdAt).toLocaleDateString()}</span>
                            <span>Reporter: {issue.reporter}</span>
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

                        {issue.verificationNotes && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <p className="text-sm font-medium text-gray-700">Field Worker Notes:</p>
                            <p className="text-sm text-gray-600 mt-1">{issue.verificationNotes}</p>
                            {issue.verifiedBy && (
                              <p className="text-xs text-gray-500 mt-2">
                                Verified by Field Worker on {new Date(issue.verifiedAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {issue.status === 'new' && (
                              <button
                                onClick={() => updateIssueStatus(issue.id, 'in-progress')}
                                className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                              >
                                Assign to Field Worker
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
                              View Details
                            </button>
                            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                              Assign Department
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
          </div>
        </div>
      </div>
    );
  }

  // CITIZEN VIEW
  if (currentView === 'citizen') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-100">
        <div className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-7 h-7 text-orange-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">CitizenReport</h1>
                <p className="text-sm text-gray-600">Maharashtra Government</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('homepage')}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-1"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
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
                <Notifications 
                  notifications={notifications}
                  markNotificationAsRead={markNotificationAsRead}
                />
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-medium">{userInfo?.name?.charAt(0) || 'U'}</span>
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
                      {/* Only show admin/fieldworker options if user has those roles */}
                      {hasRole('admin') && (
                        <button 
                          onClick={() => setCurrentView('admin')}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Settings className="w-4 h-4 text-gray-500" />
                          <span>Admin Dashboard</span>
                        </button>
                      )}
                      {hasRole('fieldworker') && (
                        <button 
                          onClick={() => setCurrentView('fieldworker')}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <UserCheck className="w-4 h-4 text-gray-500" />
                          <span>Field Worker View</span>
                        </button>
                      )}
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
              {/* <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Make Your City Better</h2>
                <p className="text-orange-100 mb-4">Report civic issues and track their resolution in real-time</p>
                <button 
                  onClick={() => setShowReportForm(true)}
                  className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Report an Issue</span>
                </button>
              </div> */}
              <div 
                className="rounded-2xl p-6 text-white"
                style={{ background: 'linear-gradient(to right, #f97316, #dc2626)' }}
              >
                <h2 className="text-2xl font-bold mb-2">Make Your City Better</h2>
                <p className="text-orange-100 mb-4">Report civic issues and track their resolution in real-time</p>
                <button 
                  onClick={() => setShowReportForm(true)}
                  className="relative bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold overflow-hidden group transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                >
                  {/* Animated background on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-100 to-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  
                  {/* Button content */}
                  <span className="relative flex items-center justify-center space-x-2">
                    <Camera className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                    <span>Report an Issue</span>
                  </span>
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
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100'}`}
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
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Government Departments Section */}
              <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <Users className="w-5 h-5 text-orange-600" />
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
                            <p className="text-sm text-orange-600 mt-1">{dept.head}</p>
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

              <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
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
                                <p className="text-xs text-orange-600">Assigned: {issue.assignedTo}</p>
                                <div className="flex items-center space-x-3 text-gray-500">
                                  <button className="flex items-center space-x-1 text-xs hover:text-orange-600">
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>{issue.votes}</span>
                                  </button>
                                  <button className="flex items-center space-x-1 text-xs hover:text-orange-600">
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
                        <MapPinned className="w-10 h-10 text-orange-500 mx-auto mb-2" />
                        <p className="text-gray-600">Map view will be available in the next update</p>
                        <button className="mt-3 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm">
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
                    <Info className="w-5 h-5 text-orange-600" />
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
                      <button className="mt-3 text-xs text-orange-600 hover:text-orange-800 font-medium">
                        Read Guide
                      </button>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col">
                      <div className="p-2 rounded-lg bg-yellow-100 w-fit mb-3">
                        <Award className="w-5 h-5 text-yellow-600" />
                      </div>
                      <h4 className="text-sm font-semibold mb-1">Citizen Engagement Program</h4>
                      <p className="text-xs text-gray-600 flex-1">Join our initiative to foster community participation in governance</p>
                      <button className="mt-3 text-xs text-orange-600 hover:text-orange-800 font-medium">
                        Join Program
                      </button>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col">
                      <div className="p-2 rounded-lg bg-green-100 w-fit mb-3">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <h4 className="text-sm font-semibold mb-1">Government Initiatives</h4>
                      <p className="text-xs text-gray-600 flex-1">Explore various government schemes and initiatives for citizens</p>
                      <button className="mt-3 text-xs text-orange-600 hover:text-orange-800 font-medium">
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
                  className="bg-white/30 backdrop-blur-md border border-white/20 text-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                  // className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                            ? 'border-orange-500 bg-orange-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${category.color}`}>
                          {React.createElement(category.icon, { className: "w-4 h-4 text-white" })}
                        </div>
                        <span className="text-xs font-medium text-gray-700">{category.name}</span>
                        {reportForm.category === category.id && (
                          <span className="text-xs text-orange-600 text-center">→ {category.department}</span>
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={reportForm.priority}
                    onChange={(e) => setReportForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 transition-colors flex flex-col items-center space-y-2"
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
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Report</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Government Verification Section */}
        <div className="max-w-7xl mx-auto p-4">
          <div 
            className="rounded-xl p-6 text-white"
            style={{ background: 'linear-gradient(to right, #ea580c, #dc2626)' }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Government of Maharashtra - Verified System</h3>
                <p className="text-orange-100">Department of Higher and Technical Education</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/20 transition-colors duration-300">
                <h4 className="font-semibold mb-2">System Authorization</h4>
                <p className="text-sm text-orange-100">Authorized by Chief Secretary, Maharashtra</p>
                <p className="text-xs text-orange-200 mt-1">Ref: CS/DHTE/2024/156</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/20 transition-colors duration-300">
                <h4 className="font-semibold mb-2">Data Security</h4>
                <p className="text-sm text-orange-100">ISO 27001 Certified Infrastructure</p>
                <p className="text-xs text-orange-200 mt-1">NIC Data Center Compliance</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/20 transition-colors duration-300">
                <h4 className="font-semibold mb-2">Legal Framework</h4>
                <p className="text-sm text-orange-100">Right to Information Act, 2005</p>
                <p className="text-xs text-orange-200 mt-1">Citizen Charter Compliant</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span>System ID: MH-CIVIC-2024-001</span>
                  <span>•</span>
                  <span>Last Audit: September 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Verified by:</span>
                  <span className="font-semibold">NIC Maharashtra</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-white border-t mt-10 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-6 h-6 text-orange-600" />
                  <h3 className="text-lg font-bold text-gray-800">CitizenReport</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  A civic issue reporting platform by the Government of Maharashtra to empower citizens and enhance municipal services.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600">About Us</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600">How It Works</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600">Departments</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Government Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600">Maharashtra Portal</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600">Municipal Corporation</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600">e-Governance Services</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Contact Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Mumbai, Maharashtra</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">+91-651-2400001</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">support@CitizenReport.Maharashtra.gov.in</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-6 text-center">
              <p className="text-sm text-gray-600">
                © 2025 Government of Maharashtra • All rights reserved
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }





  {showSettingsForm && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Account Settings</h2>
          <button 
            onClick={() => setShowSettingsForm(false)}
            // className="p-2 hover:bg-gray-100 rounded-full"
            className="bg-white/30 backdrop-blur-md border border-white/20 text-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <SettingsForm />
        </div>
      </div>
    </div>
  )}



// Add this JSX somewhere visible during development
{process.env.NODE_ENV === 'development' && (
  <div className="fixed bottom-4 right-4 z-50">
    <CreateAdmin />
  </div>
)}


  return null;
};

export default CivicReportingSystem;                              