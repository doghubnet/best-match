import { Search, CheckSquare, Download, Mic, Info, Infinity, Calendar, Star, Bell, Folder, Loader2 } from 'lucide-react'
const wrap = (C: any) => () => <C className='h-5 w-5 text-cyan-300' />
export const ExploreIcon = wrap(Search)
export const CheckBoxIcon = wrap(CheckSquare)
export const DownloadWaveIcon = wrap(Download)
export const MicrophoneIcon = wrap(Mic)
export const InfoIcon = wrap(Info)
export const InfinityIcon = wrap(Infinity)
export const CalendarIcon = wrap(Calendar)
export const StarIcon = wrap(Star)
export const NotificationIcon = wrap(Bell)
export const FolderIcon = wrap(Folder)
export const LoadingSpinnerIcon = () => <Loader2 className='h-5 w-5 animate-spin text-cyan-300' />
export const pricingIcons = { ExploreIcon, CheckBoxIcon, DownloadWaveIcon, MicrophoneIcon, InfoIcon, InfinityIcon, CalendarIcon, StarIcon, NotificationIcon, FolderIcon, LoadingSpinnerIcon }
