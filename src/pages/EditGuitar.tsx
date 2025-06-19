import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import { Guitar, GuitarFormData, GuitarType } from '../types/guitar';
import { GuitarService } from '../services/database';

const GUITAR_TYPES: { value: GuitarType; label: string }[] = [
  { value: 'electric', label: 'Electric' },
  { value: 'acoustic', label: 'Acoustic' },
  { value: 'classical', label: 'Classical' },
  { value: 'bass', label: 'Bass' },
  { value: 'electric-acoustic', label: 'Electric-Acoustic' },
  { value: 'twelve-string', label: '12-String' },
  { value: 'resonator', label: 'Resonator' },
  { value: 'other', label: 'Other' },
];

function EditGuitar() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [guitar, setGuitar] = useState<Guitar | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GuitarFormData>();

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
        // Populate form with existing data
        reset({
          brand: guitarData.brand,
          model: guitarData.model,
          year: guitarData.year,
          type: guitarData.type,
          serialNumber: guitarData.serialNumber || '',
          purchaseDate: guitarData.purchaseDate || '',
          purchasePrice: guitarData.purchasePrice,
          currentValue: guitarData.currentValue,
          color: guitarData.color || '',
          notes: guitarData.notes || '',
        });
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

  const onSubmit = async (data: GuitarFormData) => {
    if (!guitar?.id) return;

    try {
      setSaving(true);
      setError('');
      
      const guitarData = {
        ...data,
        year: data.year ? Number(data.year) : undefined,
        purchasePrice: data.purchasePrice ? Number(data.purchasePrice) : undefined,
        currentValue: data.currentValue ? Number(data.currentValue) : undefined,
      };

      await GuitarService.update(guitar.id, guitarData);
      navigate(`/guitar/${guitar.id}`);
    } catch (err) {
      setError('Failed to update guitar. Please try again.');
      console.error('Error updating guitar:', err);
    } finally {
      setSaving(false);
    }
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
        <p className="text-gray-500 mb-6">{error || 'The guitar you\'re trying to edit doesn\'t exist.'}</p>
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
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link
          to={`/guitar/${guitar.id}`}
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Guitar
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Edit {guitar.brand} {guitar.model}
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Brand and Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                Brand *
              </label>
              <input
                {...register('brand', { required: 'Brand is required' })}
                type="text"
                id="brand"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Fender, Gibson, Martin"
              />
              {errors.brand && (
                <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                Model *
              </label>
              <input
                {...register('model', { required: 'Model is required' })}
                type="text"
                id="model"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Stratocaster, Les Paul, D-28"
              />
              {errors.model && (
                <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>
              )}
            </div>
          </div>

          {/* Type and Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select
                {...register('type', { required: 'Type is required' })}
                id="type"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select type...</option>
                {GUITAR_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <input
                {...register('year', {
                  min: { value: 1800, message: 'Year must be 1800 or later' },
                  max: { value: new Date().getFullYear() + 1, message: 'Year cannot be in the future' },
                })}
                type="number"
                id="year"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 2023"
              />
              {errors.year && (
                <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
              )}
            </div>
          </div>

          {/* Serial Number and Color */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Serial Number
              </label>
              <input
                {...register('serialNumber')}
                type="text"
                id="serialNumber"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Serial number"
              />
            </div>

            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <input
                {...register('color')}
                type="text"
                id="color"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Sunburst, Black, Natural"
              />
            </div>
          </div>

          {/* Purchase Date and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Date
              </label>
              <input
                {...register('purchaseDate')}
                type="date"
                id="purchaseDate"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Price ($)
              </label>
              <input
                {...register('purchasePrice', {
                  min: { value: 0, message: 'Price must be positive' },
                })}
                type="number"
                step="0.01"
                id="purchasePrice"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
              {errors.purchasePrice && (
                <p className="mt-1 text-sm text-red-600">{errors.purchasePrice.message}</p>
              )}
            </div>
          </div>

          {/* Current Value */}
          <div>
            <label htmlFor="currentValue" className="block text-sm font-medium text-gray-700 mb-2">
              Current Value ($)
            </label>
            <input
              {...register('currentValue', {
                min: { value: 0, message: 'Value must be positive' },
              })}
              type="number"
              step="0.01"
              id="currentValue"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
            {errors.currentValue && (
              <p className="mt-1 text-sm text-red-600">{errors.currentValue.message}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              {...register('notes')}
              id="notes"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional information about this guitar..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Link
              to={`/guitar/${guitar.id}`}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditGuitar;