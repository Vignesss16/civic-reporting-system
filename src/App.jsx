
// ---------------------------------------------NEW-NEW-NEW-NEW-NWNENWN----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




import supabase from './lib/supabaseClient';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Camera, MapPin, Send, AlertCircle, CheckCircle, Clock, Filter,
  Settings, BarChart3, Users, Zap, Home, User, Search, Bell, Eye,
  Trash2, Lightbulb, Construction, Trees, Phone, Mail, Shield,
  LogIn, UserPlus, Lock, ArrowRight, LogOut, MapPinned, MessageCircle,
  ThumbsUp, Calendar, UserCog, FileText, ChevronDown, X, Menu,
  Map, List, Info, Heart, HelpCircle, Award, ThumbsDown, 
  ClipboardCheck, Navigation, UserCheck, Edit3, CheckSquare
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
          
          // Set view based on role
          if (profile?.role === 'admin') {
            setCurrentView('admin');
          } else if (profile?.role === 'fieldworker') {
            setCurrentView('fieldworker');
          } else {
            setCurrentView('citizen');
          }
          console.log("User logged in and redirected to appropriate view");
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
      
      // Navigate based on role
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
                  
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
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
                      className="py-2 px-3 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Citizen
                    </button>
                    <button
                      onClick={() => {
                        setUserInfo({
                          name: 'Field Worker',
                          email: 'fieldworker@example.com',
                          role: 'fieldworker',
                          id: 'FW001',
                          department: 'PWD Roads',
                          joinedOn: '2023-01-15'
                        });
                        setCurrentView('fieldworker');
                      }}
                      className="py-2 px-3 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Field Worker
                    </button>
                    <button
                      onClick={() => {
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
                      className="py-2 px-3 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Admin
                    </button>
                  </div>
                </div>
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Field Worker View
  if (currentView === 'fieldworker') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-7 h-7 text-indigo-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Field Worker Dashboard</h1>
                <p className="text-sm text-gray-600">Government of Jharkhand</p>
              </div>
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
                      <p className="text-xs text-green-600">{userInfo?.department}</p>
                    </div>
                    <div>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
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
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 space-y-6">
          {/* Field Worker Stats */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Field Worker Portal</h2>
            <p className="text-green-100 mb-4">Verify and update issue reports in your area</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{issues.filter(i => i.status === 'new').length}</div>
                <div className="text-sm text-green-100">New Issues</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{issues.filter(i => i.status === 'verified' || i.status === 'in-progress').length}</div>
                <div className="text-sm text-green-100">In Progress</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{issues.filter(i => i.status === 'resolved').length}</div>
                <div className="text-sm text-green-100">Completed</div>
              </div>
            </div>
          </div>

          {/* Available Issues for Verification */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                <ClipboardCheck className="w-5 h-5 text-green-600" />
                <span>Issues for Verification</span>
              </h3>
            </div>
            <div className="p-4">
              {issues.filter(i => i.status === 'new').length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ClipboardCheck className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No new issues to verify</p>
                  <p className="text-sm">Check back later for new reports</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {issues.filter(i => i.status === 'new').map((issue) => {
                    const category = issueCategories.find(cat => cat.id === issue.category);
                    return (
                      <div key={issue.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${category?.color || 'bg-gray-500'}`}>
                              {category && React.createElement(category.icon, { className: "w-5 h-5 text-white" })}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">{issue.description}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-sm text-gray-600">Reported by: {issue.reporter}</span>
                                <span className="text-xs text-gray-500">• {new Date(issue.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{issue.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                            New Report
                          </div>
                        </div>
                        
                        {issue.photo && (
                          <div className="mb-3">
                            <img 
                              src={issue.photo} 
                              alt="Issue photo" 
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                const coords = issue.location.split(',');
                                if (coords.length === 2) {
                                  const url = `https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}`;
                                  window.open(url, '_blank');
                                }
                              }}
                              className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                            >
                              <Navigation className="w-4 h-4" />
                              <span>Navigate</span>
                            </button>
                            <button
                              onClick={() => updateIssueStatus(issue.id, 'verified')}
                              className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                            >
                              <UserCheck className="w-4 h-4" />
                              <span>Verify Issue</span>
                            </button>
                            <button
                              onClick={() => updateIssueStatus(issue.id, 'in-progress')}
                              className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
                            >
                              <Clock className="w-4 h-4" />
                              <span>Start Work</span>
                            </button>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
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
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span>Work in Progress</span>
              </h3>
            </div>
            <div className="p-4">
              {issues.filter(i => i.status === 'in-progress' || i.status === 'verified').length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No work in progress</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {issues.filter(i => i.status === 'in-progress' || i.status === 'verified').map((issue) => {
                    const category = issueCategories.find(cat => cat.id === issue.category);
                    return (
                      <div key={issue.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${category?.color || 'bg-gray-500'}`}>
                              {category && React.createElement(category.icon, { className: "w-5 h-5 text-white" })}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">{issue.description}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-sm text-gray-600">Reported by: {issue.reporter}</span>
                                <span className="text-xs text-gray-500">• {new Date(issue.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{issue.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                            {issue.status === 'verified' ? 'Verified' : 'In Progress'}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateIssueStatus(issue.id, 'resolved')}
                              className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Mark Resolved</span>
                            </button>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
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
        </div>
      </div>
    );
  }

  // Continue with existing citizen and admin views...
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
                      <button 
                        onClick={() => setCurrentView('fieldworker')}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <UserCheck className="w-4 h-4 text-gray-500" />
                        <span>Field Worker View</span>
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
        <div className="max-w-7xl mx-auto p-4">
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
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">About Us</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">How It Works</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Departments</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Government Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Jharkhand Portal</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Municipal Corporation</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600">e-Governance Services</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Contact Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Ranchi, Jharkhand</span>
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
                © 2025 Government of Jharkhand • All rights reserved
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Admin View (keeping your existing admin view)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-7 h-7 text-indigo-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Civic Issue Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
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
                    <button 
                      onClick={() => setCurrentView('fieldworker')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <UserCheck className="w-4 h-4 text-gray-500" />
                      <span>Field Worker View</span>
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

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{issue.location}</span>
                          </span>
                          <span>Reported: {new Date(issue.createdAt).toLocaleDateString()}</span>
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
};

export default CivicReportingSystem;
