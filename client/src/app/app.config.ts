import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import {
  ArrowLeft, ArrowRight, Award, BookOpen, Briefcase,
  Building2, Calendar, Camera, ChartBar, Check, ChevronDown, ChevronLeft,
  ChevronRight, ChevronsLeft, ChevronsRight, CircleAlert, CircleCheck, CircleDot, CircleUser,
  Clock, CloudUpload, Code, ConciergeBell, Copy, Download, ExternalLink, Eye, EyeOff,
  Facebook, FileText, FolderOpen, FolderPlus, Github, Globe,
  GraduationCap, HandCoins, HandMetal, Heart, House, Image, Info, Instagram, Key,
  Layers, LayoutDashboard, Lightbulb, Link, Linkedin, ListTodo,
  LoaderCircle, Lock, LogIn, LogOut, Mail, MapPin, Menu, MessageCircle,
  Paintbrush, Palette, Pencil, Phone, PieChart, Plus, Quote, Rocket, Save,
  Search, Send, Settings, Share2, Shield, ShieldCheck, Smartphone,
  Sparkles, Star, Trash2, TrendingUp, TriangleAlert, Trophy, Twitter, Undo2, University,
  Upload, User, UserCog, UserPlus, UserX, Users, Wrench, X
} from 'lucide-angular';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(LucideAngularModule.pick({
      ArrowLeft, ArrowRight, Award, BookOpen, Briefcase,
      Building2, Calendar, Camera, ChartBar, Check, ChevronDown, ChevronLeft,
      ChevronRight, ChevronsLeft, ChevronsRight, CircleAlert, CircleCheck, CircleDot, CircleUser,
      Clock, CloudUpload, Code, ConciergeBell, Copy, Download, ExternalLink, Eye, EyeOff,
      Facebook, FileText, FolderOpen, FolderPlus, Github, Globe,
      GraduationCap, HandCoins, HandMetal, Heart, House, Image, Info, Instagram, Key,
      Layers, LayoutDashboard, Lightbulb, Link, Linkedin, ListTodo,
      LoaderCircle, Lock, LogIn, LogOut, Mail, MapPin, Menu, MessageCircle,
      Paintbrush, Palette, Pencil, Phone, PieChart, Plus, Quote, Rocket, Save,
      Search, Send, Settings, Share2, Shield, ShieldCheck, Smartphone,
      Sparkles, Star, Trash2, TrendingUp, TriangleAlert, Trophy, Twitter, Undo2, University,
      Upload, User, UserCog, UserPlus, UserX, Users, Wrench, X
    }))
  ]
};
