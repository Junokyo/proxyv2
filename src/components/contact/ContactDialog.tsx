'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    companyEmail: '',
    socialNetwork: 'WhatsApp',
    phoneCode: '+84',
    phoneNumber: '',
    useCase: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log('Form submitted:', formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      fullName: '',
      companyName: '',
      companyEmail: '',
      socialNetwork: 'WhatsApp',
      phoneCode: '+84',
      phoneNumber: '',
      useCase: '',
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Please fill in"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                required
              />
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Company Name
              </label>
              <Input
                type="text"
                placeholder="Please fill in"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                required
              />
            </div>

            {/* Company Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Company Email
              </label>
              <Input
                type="email"
                placeholder="email@company.com"
                value={formData.companyEmail}
                onChange={(e) => handleChange('companyEmail', e.target.value)}
                required
              />
            </div>

            {/* Social Network */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Social Network
              </label>
              <Select
                value={formData.socialNetwork}
                onValueChange={(value) => handleChange('socialNetwork', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select social network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  <SelectItem value="Telegram">Telegram</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Phone Number
              </label>
              <div className="flex gap-2">
                <Select
                  value={formData.phoneCode}
                  onValueChange={(value) => handleChange('phoneCode', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="+84" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+84">🇻🇳 +84</SelectItem>
                    <SelectItem value="+1">🇺🇸 +1</SelectItem>
                    <SelectItem value="+44">🇬🇧 +44</SelectItem>
                    <SelectItem value="+86">🇨🇳 +86</SelectItem>
                    <SelectItem value="+81">🇯🇵 +81</SelectItem>
                    <SelectItem value="+82">🇰🇷 +82</SelectItem>
                    <SelectItem value="+65">🇸🇬 +65</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  className="flex-1"
                  required
                />
              </div>
            </div>

            {/* Use Case */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Use Case
              </label>
              <Textarea
                placeholder="Please describe your use case"
                value={formData.useCase}
                onChange={(e) => handleChange('useCase', e.target.value)}
                rows={4}
                required
              />
            </div>

            {/* Privacy Policy Notice */}
            <div className="text-xs text-muted-foreground">
              Metro-Proxy will process your data in order administer your
              inquiry and inform you about our services. Please visit our{' '}
              <a
                href="/privacy-policy"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
