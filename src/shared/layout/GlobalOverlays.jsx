import HamSidebar from "@/components/sidebar/ham-sidebar/ham-sidebar.component";
import SearchSidebar from "@/components/sidebar/search-sidebar/search-sidebar.component";
import CatNavModal from "@/components/modals/cat-nav/cat-nav.modal";
import Loading from "@/components/modals/loading/loading.modal";
import Warning from "@/components/warning/warning.component";
import AuthModal from "@/components/modals/auth-modal/auth-modal.component";

export default function GlobalOverlays() {
  return (
    <>
      <HamSidebar />
      <SearchSidebar />
      <CatNavModal />
      <Warning />
      <Loading />
      <AuthModal/>
    </>
  );
}
