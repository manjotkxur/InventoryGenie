import React, { useEffect, useState } from 'react';
import axios from 'axios';
import formFields from '../../api/formConfig';
import { endpointMap, getEndpointFromAction } from '../../api/endpointMap';
import { useAuth } from '../../context/AuthContext';

const DynamicForm = ({ actionType, itemId = null }) => {
  const [formData, setFormData] = useState({});
  const [selectOptions, setSelectOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { accesstoken, user } = useAuth();
  const fields = formFields[actionType] || [];

  useEffect(() => {
    const fetchSelectOptions = async () => {
      const optionsToFetch = fields.filter(
        (field) => field.type === 'select' && field.fetchOptions
      );
      const newOptions = {};

      await Promise.all(
        optionsToFetch.map(async (field) => {
          try {
            const endpoint = getEndpointFromAction(field.fetchOptions);
            const res = await axios.get(endpoint.url, {
              headers: {
                Authorization: `Bearer ${accesstoken}`,
              },
            });

            newOptions[field.name] = Array.isArray(res.data)
              ? res.data
              : res.data.data || [];
          } catch (err) {
            console.error(`Failed to fetch options for ${field.name}`, err);
            newOptions[field.name] = [];
          }
        })
      );

      setSelectOptions(newOptions);
    };

    fetchSelectOptions();
  }, [actionType, accesstoken]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    const endpoint = endpointMap[actionType];
    if (!endpoint) {
      console.error('No endpoint mapping found');
      setSubmitStatus('Failed');
      setLoading(false);
      return;
    }

    const { method, url } = endpoint;
    const effectiveId = itemId || formData.id;
    const targetUrl =
      method === 'PUT' || method === 'DELETE' ? `${url}/${effectiveId}` : url;

    if ((method === 'PUT' || method === 'DELETE') && !effectiveId) {
      console.error('No ID provided for update/delete operation');
      setSubmitStatus('Failed');
      setLoading(false);
      return;
    }

    try {
      const axiosConfig = {
        method,
        url: targetUrl,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      };

      if (method !== 'DELETE') {
        axiosConfig.data = {
          ...formData,
          user_id: user?.id,
        };
      }

      await axios(axiosConfig);
      setSubmitStatus('Success');
      setFormData({});
    } catch (err) {
      console.error('Submission failed', err);
      setSubmitStatus('Failed');
    } finally {
      setLoading(false);
    }
  };

  if (
    fields.length === 0 &&
    !['deleteProduct', 'deleteSupplier', 'deleteCategory'].includes(actionType)
  ) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>

          {field.name === 'product_id' ? (
            <>
              <input
                type="text"
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                list={`suggestions-${field.name}`}
                required={field.required}
              />
              <datalist id={`suggestions-${field.name}`}>
                {Array.isArray(selectOptions[field.name]) &&
                  selectOptions[field.name].map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
              </datalist>
            </>
          ) : field.type === 'select' ? (
            <select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
            >
              <option value="">-- Select --</option>
              {field.options && Array.isArray(field.options)
                ? field.options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))
                : Array.isArray(selectOptions[field.name])
                ? selectOptions[field.name].map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))
                : null}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
            />
          )}
        </div>
      ))}

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {submitStatus && (
        <div style={{ color: submitStatus === 'Success' ? 'green' : 'red' }}>
          {submitStatus === 'Success'
            ? 'Submitted successfully!'
            : 'Submission failed.'}
        </div>
      )}
    </form>
  );
};

export default DynamicForm;
