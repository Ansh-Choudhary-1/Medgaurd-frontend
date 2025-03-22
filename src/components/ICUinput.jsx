import React from 'react'
import { Save } from 'lucide-react';
import { Link } from 'react-router-dom';

function ICUinput() {
  return (
    <Link 
    to="/result-icu">
    <button
    className="flex items-center justify-center space-x-2 w-full bg-[#00A8A8] text-white p-2 rounded-lg hover:bg-[#008f8f] transition-colors"
    >
    <Save className="h-5 w-5" />
    <span>Store PSV Data</span>
    </button>
    </Link>
  )
}

export default ICUinput