import Modal from '../components/Modal'
import SignInForm from './SiginForm';

export default function SignInModal({ onClose }) {
  return (
    <Modal show={true} onClose={onClose} widthClass='max-w-full mx-auto' >
   <div className="w-full flex justify-center">
        <SignInForm   onSuccess={() => {
            onClose(); // ✅ modal close
          }} />
      </div>
      
    </Modal>
  );
}