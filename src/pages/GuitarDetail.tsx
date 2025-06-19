import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Calendar, DollarSign, Hash, Palette } from 'lucide-react';
import { Guitar } from '../types/guitar';
import { GuitarService } from '../services/database';

function GuitarDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [guitar, setGuitar] = useState<Guitar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadGuitar(parseInt(id));
    }
  }, [id]);

  const loadGuitar = async (guitarId: number) => {
    try {
      setLoading(true);
      const guitarData = await GuitarService.getById(guitarId);
      if (guitarData) {
        setGuitar(guitarData);
      } else {
        setError('Guitar not found');
      }
    } catch (err) {
      setError('Failed to load guitar details');
      console.error('Error loading guitar:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!guitar?.id) return;
    
    if (window.confirm('Are you sure you want to delete this guitar? This action cannot be undone.')) {
      try {
        await GuitarService.delete(guitar.id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete guitar');
      }
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !guitar) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Guitar Not Found</h3>
        <p className="text-gray-500 mb-6">{error || 'The guitar you\'re looking for doesn\'t exist.'}</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Collection
        </Link>
        
        <div className="flex space-x-3">
          <Link
            to={`/guitar/${guitar.id}/edit`}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {guitar.brand} {guitar.model}
              </h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 bg-opacity-50 text-blue-100 capitalize">
                {guitar.type.replace('-', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                {guitar.year && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <span className="text-sm text-gray-500">Year</span>
                      <p className="font-medium">{guitar.year}</p>
                    </div>
                  </div>
                )}
                
                {guitar.serialNumber && (
                  <div className="flex items-center">
                    <Hash className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <span className="text-sm text-gray-500">Serial Number</span>
                      <p className="font-medium font-mono text-sm">{guitar.serialNumber}</p>
                    </div>
                  </div>
                )}

                {guitar.color && (
                  <div className="flex items-center">
                    <Palette className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <span className="text-sm text-gray-500">Color</span>
                      <p className="font-medium">{guitar.color}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500">Purchase Price</span>
                    <p className="font-medium">{formatPrice(guitar.purchasePrice)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500">Current Value</span>
                    <p className="font-medium">{formatPrice(guitar.currentValue)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500">Purchase Date</span>
                    <p className="font-medium">{formatDate(guitar.purchaseDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {guitar.notes && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Notes</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{guitar.notes}</p>
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500">
              <p>Added on {formatDate(guitar.createdAt)}</p>
              {guitar.updatedAt !== guitar.createdAt && (
                <p>Last updated {formatDate(guitar.updatedAt)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuitarDetail;