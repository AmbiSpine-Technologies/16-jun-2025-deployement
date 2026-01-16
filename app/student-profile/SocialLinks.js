"use client";
import React, { useState } from "react";
import { Plus, Trash2, ExternalLink, Pencil } from "lucide-react";
import InputWithCount from "../components/InputWithCount";
import Button from "../components/Button";

export default function SocialLinks({ initialLinks = [], onSave }) {
  const [links, setLinks] = useState(initialLinks);
  const [formData, setFormData] = useState({ platform: "", url: "" });
  const [formOpen, setFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // form input change
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // open form (edit / add)
  const openForm = (index = null) => {
    if (index !== null) {
      setFormData(links[index]); // existing link edit
      setEditingIndex(index);
    } else {
      setFormData({ platform: "", url: "" }); // new link
      setEditingIndex(null);
    }
    setFormOpen(true);
  };

  // cancel form
  const handleCancel = () => {
    setFormOpen(false);
    setFormData({ platform: "", url: "" });
    setEditingIndex(null);
  };

  // save link
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.platform.trim() || !formData.url.trim()) return; // validation

    let updated = [...links];
    if (editingIndex !== null) {
      updated[editingIndex] = formData; // update existing
    } else {
      updated.push(formData); // add new
    }

    setLinks(updated);
    onSave?.(updated);

    // reset
    setFormOpen(false);
    setFormData({ platform: "", url: "" });
    setEditingIndex(null);
  };

  // delete link
  const removeLink = (index) => {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated);
    onSave?.(updated);
  };

  return (
    <div className="p-5 rounded-lg bg-white shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Social Media Links
        </h3>
        {!formOpen && (
          <Button
            onClick={() => openForm(null)}
            buttonclass="bg-transparent border"
          >
            + Add Social Link
          </Button>
        )}
      </div>

      {/* Links List */}
      {!formOpen && links.length > 0 && (
        <div className="space-y-3">
          {links.map((link, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-3 border rounded-lg hover:shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-700">{link.platform}</p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
                >
                  {link.url}
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openForm(idx)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <Pencil size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => removeLink(idx)}
                  className="p-2 text-red-500 hover:bg-gray-100 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form */}
      {formOpen && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputWithCount
              label="Platform"
              placeholder="GitHub, LinkedIn, Instagram..."
              value={formData.platform}
              onChange={(e) => handleChange("platform", e.target.value)}
              required
            />
            <InputWithCount
              label="Profile URL"
              placeholder="https://"
              value={formData.url}
              onChange={(e) => handleChange("url", e.target.value)}
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={handleCancel}
              buttonclass="bg-gray-300 text-black rounded-lg px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              buttonclass="!bg-blue-600 text-white rounded-lg px-4 py-2"
            >
              {editingIndex !== null ? "Update Link" : "Save Link"}
            </Button>
          </div>
        </form>
      )}

      {/* Empty State */}
      {!formOpen && links.length === 0 && (
        <p className="text-gray-500 text-sm">
          No social links added yet. Click{" "}
          <span className="font-medium">+ Add Social Link</span> to add one.
        </p>
      )}
    </div>
  );
}
