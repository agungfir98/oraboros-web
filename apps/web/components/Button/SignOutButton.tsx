"use client";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState } from "react";
import Button from "./default";
import { createSupabaseClientComponent } from "~/lib/supabase/client";
import { FaSignOutAlt } from "react-icons/fa";

const SignOutButton = () => {
	const supabase = createSupabaseClientComponent();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSignOut = async () => {
		setIsLoading(true);
		return supabase.auth.signOut().then(() => {
			setIsLoading(false);
			location.replace("/");
		});
	};
	return (
		<AlertDialog.Root>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed bg-neutral-400/30 inset-0" />
				<AlertDialog.Content className="outline outline-1 outline-black w-fit px-5 py-4 self-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-solid-sm max-sm:w-[90%]">
					<div>
						<h1 className="text-red-500 font-medium">
							You are about to be Sign Out.
						</h1>
						<p>are you sure?</p>
					</div>
					<div className="flex justify-end mt-4 gap-5">
						<AlertDialog.Cancel>
							<Button
								className="shadow-solid-sm"
								variant="primary"
								size="2"
								outline="1"
							>
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<Button
								className="shadow-solid-sm"
								variant="danger"
								size="2"
								outline="1"
								isLoading={isLoading}
								onClick={handleSignOut}
							>
								Log out
							</Button>
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
			<AlertDialog.Trigger asChild>
				<Button variant="danger" outline="1" size="3" className="px-6">
					<FaSignOutAlt />
				</Button>
			</AlertDialog.Trigger>
		</AlertDialog.Root>
	);
};

export default SignOutButton;
